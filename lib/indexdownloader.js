var Transform = require('stream').Transform;
var request = require('request');

var IndexDownloader = function (opt) {
  if (!(this instanceof IndexDownloader)) {
    return new IndexDownloader(opt);
  }

  opt = opt || {};
  opt.objectMode = true;

  Transform.call(this, opt);
};

IndexDownloader.prototype = Object.create(Transform.prototype, {
  constructor: {
    value: IndexDownloader
  }
});

IndexDownloader.prototype._transform = function (source_map, encoding, done) {
  var sources = Object.keys(source_map);
  var self = this;

  var downloadComplete = function (source) {
    return function (error, response, body) {
      if (error) {
        self.emit('error', new Error('cannot retrieve file ' + source));
      } else {
        var data = {
          url: source,
          response: response,
          body: body
        };
        self.push(data);
      }
    };
  };

  sources.forEach(function (source) {
    request(source_map[source], downloadComplete(source));
  });

  done();
};

IndexDownloader.prototype.download = function (files) {
  this.write(files);
  this.end();
};

module.exports = IndexDownloader;