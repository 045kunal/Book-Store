const Order = require("../models/Order");

const orderController = {
  createOrder: async (ctx) => {
    try {
      const { user, books, orderAmount, orderAddress } = ctx.request.body;

      const newOrder = new Order({ user, books, orderAmount, orderAddress });
      console.log(newOrder);

      await newOrder.save();
      console.log("test");
      ctx.status = 201;
      ctx.body = newOrder;
    } catch (error) {
      (ctx.status = 500), (ctx.body = { error: error });
    }
  },

  getAllOrders: async (ctx) => {
    try {
      const orders = await Order.find();
      console.log(orders);
      ctx.status = 200;
      ctx.body = orders;
    } catch (error) {
      (ctx.status = 500), (ctx.body = { error: "Internal server error" });
    }
  },

  getOrdersByCustomerId: async (ctx) => {
    const userid = ctx.params.id;
    try {
      const orders = await Order.find({ user: userid });
      ctx.status = 200;
      ctx.body = orders;
    } catch (errror) {
      (ctx.status = 500), (ctx.body = { error: "Internal server error" });
    }
  },

  updateOrderStatus: async (ctx) => {
    const orderId = ctx.params.id;
    const { status } = ctx.request.body;

    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
      );

      if (!updatedOrder) {
        ctx.status = 404;
        ctx.body = { error: "Order not found" };
        return;
      }
      ctx.body = updatedOrder;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  },

  getOrderDetailsById: async (ctx) => {
      const { orderId } = ctx.params;
  
      try {
        const orderDetails = await Order.findById(orderId)
          .populate('user', 'username')
          .populate('books._id', 'title imageLink price');
  
        if (!orderDetails) {
          ctx.status = 404;
          ctx.body = { error: 'Order not found' };
          return;
        }
  
        ctx.status = 200;
        ctx.body = orderDetails;
      } catch (error) {
        console.error('Error fetching order details:', error);
        ctx.status = 500;
        ctx.body = { error: 'Error fetching order details' };
      }
  },
};

module.exports = orderController;
