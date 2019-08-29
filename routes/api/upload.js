var express = require('express');
var multer = require('multer');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join('upload')));

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage: Storage });
var fields = [{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 3 }];

app.post('/', upload.fields(fields), function(req, res, next) {
  console.log(req.files);
  res.send(req.files);
  res.end('File is uploaded');
});

module.exports = router;
