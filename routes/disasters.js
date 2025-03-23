const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Disaster = require('../models/Disaster');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Display all disasters and form
router.get('/', async (req, res) => {
  try {
    const disasters = await Disaster.find().sort({ createdAt: -1 });
    res.render('index', { disasters });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Handle form submission
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { disasterName, latitude, longitude, description } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : null;

    const newDisaster = new Disaster({
      disasterName,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      description,
      image
    });

    await newDisaster.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;