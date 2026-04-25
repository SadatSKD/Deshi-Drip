const Order = require('../models/Order');

// POST /api/orders — Place a new order
const createOrder = async (req, res, next) => {
  try {
    const { items, customer, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No items in order');
    }

    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const deliveryFee = 0; // Free delivery
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      items,
      customer,
      paymentMethod: paymentMethod || 'cod',
      subtotal,
      deliveryFee,
      total,
    });

    res.status(201).json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        _id: order._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:orderNumber — Get order by order number
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getOrder };
