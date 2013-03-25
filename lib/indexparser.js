var Transform = require('stream').Transform;

var IndexParser = function (opt) {
  if (!(this instanceof IndexParser)) {
    return new IndexParser(opt);
  }

  opt = opt || {};
  opt.objectMode = true;

  Transform.call(this, opt);
};

IndexParser.prototype = Object.create(Transform.prototype, {
  constructor: {
    value: IndexParser
  }
});

IndexParser.prototype._transform = function (index_data, encoding, done) {
  console.log("processing", index_data.source);

  this.push({
    // body: $body,
    // links: links
  });
  // var file = {
  //   source: index_data.source,
  //   filename: filename,
  //   url: url
  // };

  // self.push(file);

  done();
};

module.exports = IndexParser;