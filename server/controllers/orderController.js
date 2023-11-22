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
    const { userid } = ctx.params.id;
    try {
      const orders = await Order.find({ userid });
      console.log(orders);
      ctx.status = 200;
      ctx.body = orders;
    } catch (errror) {
      (ctx.status = 500), (ctx.body = { error: "Internal server error" });
    }
  },
};

module.exports = orderController;
