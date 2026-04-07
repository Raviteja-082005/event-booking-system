const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  try {
    const { eventId, seats } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.availableSeats < seats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalAmount = event.price * seats;

    // Mock payment ID (simulating Stripe)
    const mockPaymentId = 'mock_pay_' + Date.now();

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      seats,
      totalAmount,
      paymentId: mockPaymentId,
      paymentStatus: 'completed'
    });

    event.availableSeats -= seats;
    await event.save();

    res.status(201).json({
      booking,
      clientSecret: mockPaymentId,
      message: 'Payment simulated successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('event').populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    const event = await Event.findById(booking.event);
    event.availableSeats += booking.seats;
    await event.save();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
