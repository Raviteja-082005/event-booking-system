const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings, cancelBooking } = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, createBooking);
router.get('/my', auth, getUserBookings);
router.get('/all', adminAuth, getAllBookings);
router.put('/cancel/:id', auth, cancelBooking);

module.exports = router;