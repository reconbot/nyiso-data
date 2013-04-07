var Transform = require('stream').Transform;
var Apricot = require('apricot').Apricot;
var url = require('url');

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
  // console.log("processing", index_data.source);
  var self = this;
  Apricot.parse(index_data.body, function (err, doc) {
    var links = doc.find("a");
    links.each(function (link) {
      if (!link.attributes.href) { return; }

      var href = link.attributes.href.value;
      if (! href.match(/\.csv$/)) { return; }

      var file = {
        source: index_data.source,
        source_url: index_data.url,
        // filename: filename,
        text: link.innerHTML,
        url: url.resolve(index_data.url, href)
      };

      self.push(file);
    });
  });
  done();
};

module.exports = IndexParser;