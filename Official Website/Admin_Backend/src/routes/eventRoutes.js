// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload');
const { userAuth } = require('../middleware/auth');

// Create event with multiple images (max 10)
router.post('/', upload.array('images', 10), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
// Update event with optional new images
router.put('/:id', upload.array('images', 10), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
