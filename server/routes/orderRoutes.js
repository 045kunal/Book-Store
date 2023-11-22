const Router = require("koa-router");
const orderController = require("../controllers/orderController");

const router = new Router();

router.post("/createOrder", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrdersByCustomerId);
router.get("/updateOrder/:id", orderController.updateOrderStatus);

module.exports = router;
