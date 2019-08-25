const express = require('express');
const multer = require('multer');
const router = express.Router();
var upload = multer();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', upload.none(), (req, res, next) => {
  res.send(req.body);
});

module.exports = router;
