const Router = require("koa-router");
const orderController = require("../controllers/orderController");

const router = new Router();

router.post("/createOrder", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrdersByCustomerId);
router.patch("/updateOrder/:id", orderController.updateOrderStatus);
router.get("/orders/details/:id", orderController.getOrderDetailsById);

module.exports = router;
