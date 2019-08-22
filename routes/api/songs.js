const express = require('express');
const Multer = require('multer');
const gcsMiddlewares = require('../../gcs_middleware');
const router = express.Router();

const multer = Multer({
  storage: Multer.storage,
  limits: {
    fileSize: 10 * 1024 * 1024 //Maximum file size is 10MB
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  multer.single('avatar'),
  gcsMiddlewares.sendUploadToGCS,
  (req, res, next) => {
    var imageUrl;
    if (req.file && req.file.gcsUrl) {
      imageUrl = req.file.gcsUrl;
    }
    var responseBody = {
      file: imageUrl,
      body: req.body
    };

    res.send(req);
  }
);

module.exports = router;
