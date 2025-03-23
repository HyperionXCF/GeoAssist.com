const express = require('express');
const router = express.Router();
const AidRequest = require('../models/AidRequest');

// Display aid request form
router.get('/aid-request', (req, res) => {
  res.render('aid-request');
});

// Handle aid request submission
router.post('/aid-request', async (req, res) => {
  try {
    const { name, contact, latitude, longitude, description } = req.body;

    const newAidRequest = new AidRequest({
      name,
      contact,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      description
    });

    await newAidRequest.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/aid-request');
  }
});

module.exports = router;