var nyiso = require('./nyiso-data');

var index_map = {
  'dam-lbmp-generator': 'http://mis.nyiso.com/public/P-24Blist.htm',
  'dam-lbmp-zonal': 'http://mis.nyiso.com/public/P-2Alist.htm',
  'rtm-lbmp-generator': 'http://mis.nyiso.com/public/P-2Alist.htm',
  'rtm-lbmp-zonal': 'http://mis.nyiso.com/public/P-24Alist.htm'
};

var index_downloader = new nyiso.IndexDownloader();
// var index_parser = new nyiso.IndexParser();
// var file_downloader = new nyiso.FileDownloader();
// var file_parser = new nyiso.FileParser();

// index_downloader.pipe(index_parser);
// index_parser.pipe(file_downloader);

index_downloader.download(index_map);