const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Pod = require('../../models/Pod');

var podCreateValidator = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
];

// @route   POST api/pods
// @desc    Create Tag
// @access  Public
router.post('/', podCreateValidator, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, image, songs } = req.body;
  try {
    let pod = await Pod.findOne({ name });
    // see if tag exists
    if (pod) {
      res.status(400).json({ errors: [{ msg: 'Pod already exists' }] });
    }

    //save tag
    pod = new Pod({
      name,
      description,
      image,
      songs
    });

    await pod.save();

    // return tag
    res.send(pod);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/pod
// @desc Get all tags
// @access public
router.get('/', async (req, res) => {
  try {
    const pods = await Pod.find().sort({ date: -1 });
    res.json(pods);
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
    const pod = await Pod.findById(req.params.id);
    if (!pod) {
      return res.status(404).json({ msg: 'pod not found' });
    }
    res.json(pod);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'pod not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/tag/:id
// @desc Delete a tag
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const pod = await Pod.findById(req.params.id);

    if (!pod) {
      return res.status(404).json({ msg: 'Pod not found' });
    }

    await pod.remove();
    res.json({
      msg: 'pod removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'pod not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
