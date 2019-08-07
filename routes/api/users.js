const express = require('express');
const multer = require('multer');
const router = express.Router();
var upload = multer({ dest: 'uploads/' });

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', upload.single('avatar'), (req, res, next) => {
  console.log(' file ' + req.file);
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
