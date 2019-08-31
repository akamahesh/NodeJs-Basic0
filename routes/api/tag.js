const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Tag = require('../../models/Tag');

var tagCreateValidator = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
];

// @route   POST api/tags
// @desc    Create Tag
// @access  Public
router.post('/', tagCreateValidator, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, slug } = req.body;
  try {
    let tag = await Tag.findOne({ name });
    // see if tag exists
    if (tag) {
      res.status(400).json({ errors: [{ msg: 'Tag already exists' }] });
    }

    //save tag
    tag = new Tag({
      name,
      slug
    });

    await tag.save();

    // return tag
    res.send(tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/tag
// @desc Get all tags
// @access public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().sort({ date: -1 });
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/tag/:id
// @desc Get tag by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/tag/:id
// @desc Delete a tag
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ msg: 'Tag not found' });
    }

    await tag.remove();
    res.json({
      msg: 'tag removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
