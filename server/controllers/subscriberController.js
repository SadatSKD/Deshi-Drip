const Subscriber = require('../models/Subscriber');

// POST /api/subscribe
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "You're already subscribed! 🔥" });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({
      success: true,
      message: "You're on the list! Expect fire drops soon. 🔥",
      data: { email: subscriber.email, subscribedAt: subscriber.subscribedAt },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe };
