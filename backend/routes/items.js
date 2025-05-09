const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('seller', 'username');
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's items
router.get('/my-items', auth, async (req, res) => {
  try {
    const items = await Item.find({ seller: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add new item
router.post('/', auth, async (req, res) => {
  try {
    const { collection, name, frontImage, backImage, colors, type, size } = req.body;

    const newItem = new Item({
      collection,
      name,
      frontImage,
      backImage,
      colors,
      type,
      size,
      seller: req.user.id
    });

    const item = await newItem.save();
    
    // Add item to user's items array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { items: item._id } }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update item
router.put('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check if user owns the item
    if (item.seller.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check if user owns the item
    if (item.seller.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await item.remove();

    // Remove item from user's items array
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { items: req.params.id } }
    );

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 