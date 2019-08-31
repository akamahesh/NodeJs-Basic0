const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Song = require('../../models/Song');

var songValidator = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
];

// @route   POST api/songs
// @desc    Create song
// @access  Public
router.post('/', songValidator, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, audio, image, description, duration, tags } = req.body;
  try {
    //save tag
    console.log('array ');
    let song = new Song({
      name,
      audio,
      image,
      description,
      duration,
      tags
    });

    await song.save();
    // return tag
    res.send(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

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
