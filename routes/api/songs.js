const express = require('express');
const Multer = require('multer');
const gcsMiddlewares = require('../../gcs_middleware');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const multer = Multer({
  storage: Multer.storage,
  limits: {
    fileSize: 10 * 1024 * 1024 //Maximum file size is 10MB
  }
});

var songValidator = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('audio', 'audio is required')
    .not()
    .isEmpty()
];

// @route   POST api/songs
// @desc    Create song
// @access  Public
router.post(
  '/',
  multer.single('audio'),
  gcsMiddlewares.sendUploadToGCS,
  songValidator,
  (req, res, next) => {
    console.log('File uploaded');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var audio;
    if (req.file && req.file.gcsUrl) {
      audio = req.file.gcsUrl;
    }
    var responseBody = {
      file: audio,
      body: req.body
    };

    res.send(responseBody);
  }
);

module.exports = router;
