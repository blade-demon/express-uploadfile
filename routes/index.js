var express = require('express');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });
var router = express.Router();

router.get('/', (req, res) => {
  res.send("文件上传Demo");
});

router.post('/uploadfiles', upload.array('image', 4), function (req, res, next) {
  res.send(req.files[0].filename);
});

module.exports = router;