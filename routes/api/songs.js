const express = require('express');
const Multer = require('multer');
const gcsMiddlewares = require('../../gcs_middleware');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Song = require('../../models/Song');
const Tag = require('../../models/Tag');
const multer = Multer({
  storage: Multer.storage,multer
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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var audio;
    if (req.file && req.file.gcsUrl) {
      audio = req.file.gcsUrl;
    }
    const { name, description, duration } = req.body;
    let tagy = req.body.tags;
    try {
      let tagArray = tagy.split(',');
      let tags = [];
      tagArray.forEach(async function(entry) {
        if (entry) tags.push(entry);
      });
      //save song
      let song = new Song({
        name,
        audio,
        description,
        duration,
        tags
      });

      await song.save();

      // return song
      res.send(song);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/songs
// @desc Get all songs
// @access public
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ date: -1 });
    res.json(songs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/song/:id
// @desc Get song by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'song not found' });
    }
    res.json(song);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'song not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/tag/:id
// @desc Delete a tag
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ msg: 'Tag not found' });
    }

    await song.remove();
    res.json({
      msg: 'song removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'song not found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
