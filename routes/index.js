var express = require("express");
var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("images", 4);

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/upload", function(req, res) {
  upload(req, res, err => {
    if (err) {
      res.render("index", {
        msg: err
      });
    } else {
      if (req.files.length === 0) {
        res.render("index", {
          msg: "Error: No File Selected!"
        });
      } else {
        const path = req.files.map(file => file.path.substr(7));
        console.log(path);
        res.render("index", {
          msg: "File Uploaded!",
          filesPath: path
        });
      }
    }
  });
});

module.exports = router;
