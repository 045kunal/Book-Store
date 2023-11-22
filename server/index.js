const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const serve = require("koa-static");
const path = require("path");
// const mount = require('koa-mount');

const app = new Koa();

app.use(serve(path.join(__dirname, "public")));
app.use(bodyParser());
app.use(cors());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
app.use(bookRoutes.routes());
app.use(orderRoutes.routes());
// app.use(customerRoutes.routes());
// app.use(customerRoutes.allowedMethods());

mongoose
  .connect("mongodb://mongoadmin:secret@localhost:27017/book-store")
  .then(() => console.log("Connected to database!!!"))
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
