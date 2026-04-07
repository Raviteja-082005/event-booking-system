const express = require('express');
const router = express.Router();
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', adminAuth, createEvent);
router.put('/:id', adminAuth, updateEvent);
router.delete('/:id', adminAuth, deleteEvent);

module.exports = router;