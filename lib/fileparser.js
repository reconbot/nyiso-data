var Transform = require('stream').Transform;

var FileParser = function (opt) {
  if (!(this instanceof FileParser)) {
    return new FileParser(opt);
  }

  opt = opt || {};
  opt.objectMode = true;

  Transform.call(this, opt);
};

FileParser.prototype = Object.create(Transform.prototype, {
  constructor: {
    value: FileParser
  }
});

FileParser.prototype._transform = function (source_map, encoding, done) {
  // var sources = Object.keys(source_map);
  // var self = this;

  // var downloadComplete = function (source) {
  //   return function (error, response, body) {
  //     if (error) {
  //       self.emit('error', new Error('cannot retrieve file ' + source));
  //     } else {
  //       var data = {
  //         url: source,
  //         response: response,
  //         body: body
  //       };
  //       self.push(data);
  //     }
  //   };
  // };

  // sources.forEach(function (source) {
  //   request(source_map[source], downloadComplete(source));
  // });

  // done();
};

module.exports = FileParser;