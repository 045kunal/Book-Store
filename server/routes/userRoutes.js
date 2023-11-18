const Router = require("koa-router");
const userController = require("../controllers/userController");
const router = new Router();
const middlewares = require("../middlewares/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.patch("/userUpdate/:id", userController.updateUser);
router.delete("/userDelete/:id", userController.deleteUser);
router.get("/user/:id", userController.getUserByID);
router.get("/all-users", userController.getAllUsers);

module.exports = router;
