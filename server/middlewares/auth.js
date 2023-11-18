const jwt = require("jsonwebtoken");
const User = require("../models/User");
let UserRole = require("../models/user_role");
// const mongoose = require("koa-mongoose");
const Role = require("../models/Role");

module.exports = {
  verifyUser: async function verifyUser(ctx, next) {
    const cookie = ctx.cookies.get("jwt");
    // console.log("cookie: ", cookie);
    if (!cookie) {
      ctx.status = 403;
      console.log("cookie not available");
      ctx.body = {
        error: "Protected route",
      };
      return;
    }
    try {
      let decodedUser = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
      ctx.decodedUser = decodedUser;
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        error: "Protected route",
      };
    }
  },
  verifyAdmin: async function verifyAdmin(ctx, next) {
    const cookie = ctx.cookies.get("jwt");

    // const cookieHeader = ctx.headers.cookie;
    // if (cookieHeader) {
    //   console.log("cookie sent");
    // } else console.log("not sent");

    if (!cookie) {
      ctx.status = 403;
      ctx.body = {
        error: "Protected route",
      };
      return;
    }
    try {
      let decodedUser = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
      ctx.decodedUser = decodedUser;
      const currentUser_id = decodedUser.id; // role is already in token, so directly extract it.
      const currentUser_roleidObj = await UserRole.findOne(
        {
          userid: currentUser_id,
        },
        { roleid: 1, _id: 0 }
      );

      const currentUser_roleid = currentUser_roleidObj.roleid;
      // console.log("currentUser_roleid: ", currentUser_roleid);
      const currentUser_roleObj = await Role.findById(currentUser_roleid);

      const currentUser_role = currentUser_roleObj.role;

      if (currentUser_role !== "admin") {
        ctx.status = 401;
        ctx.body = { message: "User not authorized for this route" };
        return;
      } else {
        await next();
      }
    } catch {
      ctx.status = 500;
      ctx.body = {
        error: "Protected routes",
      };
    }
  },
};
