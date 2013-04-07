var Transform = require('stream').Transform;
var request = require('request');

var FileDownloader = function (opt) {
  if (!(this instanceof FileDownloader)) {
    return new FileDownloader(opt);
  }

  opt = opt || {};
  opt.objectMode = true;

  Transform.call(this, opt);
};

FileDownloader.prototype = Object.create(Transform.prototype, {
  constructor: {
    value: FileDownloader
  }
});

FileDownloader.prototype._transform = function (file_data, encoding, done) {
  var self = this;

  var downloadComplete = function (source) {
    return function (error, response, body) {
      if (error) {
        self.emit('error', new Error('cannot retrieve ' + source.url));
      } else {
        source.body = body;
        self.push(source);
      }
    };
  };

  request(file_data.url, downloadComplete(file_data));

  done();
};

module.exports = FileDownloader;