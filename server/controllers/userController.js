const Role = require("../models/Role");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const { param } = require("../routes/bookRoutes");
const UserRole = require("../models/user_role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const userController = {
  login: async (ctx) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = { error: "Fill all the details" };
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "Invalid credentials" };
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      try {
        // authentication to be written here
        const userid = user._id;
        const userroleObj = await UserRole.findOne(
          { userid },
          { roleid: 1, _id: 0 }
        );
        const userroleid = userroleObj.roleid;
        // console.log("currentUser_roleid: ", currentUser_roleid);
        const roleobj = await Role.findById(userroleid);

        const userrole = roleobj.role;

        //checking if he is a customer
        if (userrole === "customer") {
          ctx.status = 401;
          ctx.body = { error: "Unauthorized" };
          return;
        }

        const tokenPayload = {
          username,
          id: user._id,
          role: userrole,
        };
        const accessToken = jwt.sign(
          tokenPayload,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );
        // const createRefreshToken
        const refreshToken = jwt.sign(
          tokenPayload,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        ctx.status = 201;
        ctx.body = { message: "User successfully logged in", accessToken };
        ctx.cookies.set("jwt", accessToken);
        return;
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: "Internal Server Error" };
        console.error(error);
      }
    } else {
      ctx.status = 401;
      ctx.body = { error: "Invalid credentials" };
      return;
    }
  },

  register: async (ctx) => {
    const { username, firstname, lastname, emailid, mobileno, password, role } =
      ctx.request.body;

    if (
      !firstname ||
      !username ||
      !lastname ||
      !emailid ||
      !mobileno ||
      !password ||
      !role
    ) {
      ctx.status = 400;
      ctx.body = "Fill all details.";
    }

    if (!validator.isEmail(emailid)) {
      ctx.status = 400;
      ctx.body = { error: "Enter valid EmailID" };
      return;
    }

    const existingEmail = await User.findOne({ emailid });

    if (existingEmail) {
      ctx.status = 400;
      ctx.body = { error: "Email already exists" };
      return;
    }

    const existingMobileNo = await User.findOne({ mobileno });

    if (existingMobileNo) {
      ctx.status = 400;
      ctx.body = { error: "Mobile Number already exists" };
      return;
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      ctx.status = 400;
      ctx.body = { error: "User name already exists" };
      return;
    }
    // if (mobileno.length() != 10) {
    //   ctx.status = 400;
    //   ctx.body = "Enter correct Mobile No.";
    //   return;
    // }

    var hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch {
      ctx.status = 500;
      console.log(" error in hashing");
      ctx.body = "Error in hashing password.";
    }

    try {
      const user = new User({
        username,
        firstname,
        lastname,
        emailid,
        mobileno,
        password: hashedpassword,
        role,
      });
      await user.save();
      // console.log("testing");

      const user_entry = await User.findOne({ username: username });
      const role_entry = await Role.findOne({ role: role });

      const userid = user_entry._id;
      const roleid = role_entry._id;
      const entry = new UserRole({ userid, roleid });
      await entry.save();

      ctx.body = { message: "User registered successfully" };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal Server Errors" };
      console.error(error);
    }
  },
  deleteUser: async (ctx) => {
    try {
      const deletedUser = await User.findByIdAndDelete(ctx.params.id);
      if (!deletedUser) {
        (ctx.status = 404), (ctx.body = { message: "User not found" });
        return;
      }
      // console.log(deletedUser);
      const user_id = deletedUser._id;
      await UserRole.deleteOne({ userid: user_id });
      ctx.body = { message: "User deleted successfully", deletedUser };
    } catch (error) {
      (ctx.status = 500), (ctx.body = { error: "Internal Server Error" });
    }
  },
  updateUser: async (ctx) => {
    try {
      const {
        username,
        firstname,
        lastname,
        emailid,
        mobileno,
        password,
        role,
      } = ctx.request.body;

      const user_entry = await User.findById(ctx.params.id);
      if (!user_entry) {
        ctx.status = 404;
        ctx.body = { message: "User not found" };
        return;
      }

      if (emailid && !validator.isEmail(emailid)) {
        ctx.status = 400;
        ctx.body = { error: "Enter valid EmailID" };
        return;
      }

      const existingEmail = await User.findOne({ emailid });

      if (existingEmail) {
        ctx.status = 400;
        ctx.body = { error: "Email already exists" };
        return;
      }

      if (mobileno) {
        const existingMobileNo = await User.findOne({ mobileno });
        if (existingMobileNo) {
          ctx.status = 400;
          ctx.body = { error: "Mobile Number already exists" };
          return;
        }
        const mobilestring = mobileno.toString();
        if (mobilestring.length !== 10) {
          ctx.status = 400;
          ctx.body = { error: "Enter Correct mobile number" };
          return;
        }
      }

      if (username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          ctx.status = 400;
          ctx.body = { error: "User name already exists" };
          return;
        }
      }

      if (role && role === "admin") {
        ctx.status = 400;
        ctx.body = { error: "Given Role cannot be set." };
        return;
      }

      var hashedpassword;
      if (password) {
        try {
          hashedpassword = await bcrypt.hash(password, 10);
        } catch {
          ctx.status = 500;
          console.log(" error in hashing");
          ctx.body = "Error in hashing password.";
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        // { username: username },
        ctx.params.id,
        {
          username,
          firstname,
          lastname,
          emailid,
          mobileno,
          password: hashedpassword,
          role,
        },
        { new: true }
      );
      if (!updatedUser) {
        ctx.status = 404;
        ctx.body = { error: "User not found" };
        return;
      }
      ctx.code = 200;
      ctx.body = { message: "User Updated successfully" };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: err };
      ctx.body = { message: "Internal Server Error" };
    }
  },
  getAllUsers: async (ctx) => {
    try {
      // const users = await User.find();
      // ctx.body = users;
      const usersWithRoles = await User.aggregate([
        {
          $lookup: {
            from: "userroles",
            localField: "_id",
            foreignField: "userid",
            as: "userRoles",
          },
        },
        {
          $unwind: {
            path: "$userRoles",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "userRoles.roleid",
            foreignField: "_id",
            as: "roleDetails",
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            firstname: 1,
            lastname: 1,
            emailid: 1,
            mobileno: 1,
            roles: {
              $ifNull: ["$roleDetails.role", []],
            },
          },
        },
      ]);
      // console.log("roleDetails: ", );
      ctx.body = usersWithRoles;
    } catch {
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  },
  getUserByID: async (ctx) => {
    try {
      const userId = ctx.params.id;
      const user = await User.findById(userId);
      if (!user) {
        ctx.status = 404;
        ctx.body = { message: "User not found" };
        return;
      }
      await User.aggregate([
        {
          $match: { _id: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "userroles",
            let: { userId: "$_id" },
            pipeline: [
              {
                $addFields: {
                  useridObjectId: { $toObjectId: "$userid" },
                  roleidObjectId: { $toObjectId: "$roleid" },
                },
              },
              {
                $match: {
                  $expr: { $eq: ["$$userId", "$useridObjectId"] },
                },
              },
            ],
            as: "userRoles",
          },
        },
        {
          $unwind: {
            path: "$userRoles",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "userRoles.roleidObjectId",
            foreignField: "_id",
            as: "userRoles.role",
          },
        },

        {
          $unwind: {
            path: "$userRoles.role",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            username: { $first: "$username" },
            firstname: { $first: "$firstname" },
            lastname: { $first: "$lastname" },
            emailid: { $first: "$emailid" },
            mobileno: { $first: "$mobileno" },
            password: { $first: "$password" },
            userRoles: { $push: "$userRoles" },
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            firstname: 1,
            lastname: 1,
            emailid: 1,
            mobileno: 1,
            password: 1,
            userRoles: {
              $cond: {
                if: { $eq: [{ $size: "$userRoles" }, 0] },
                then: null,
                else: "$userRoles",
              },
            },
          },
        },
      ]).then((result) => {
        // console.log("match stage results: ", result[0].userRoles[0].role.role);
        ctx.body = result;
        if (result.length > 0) {
          const userDetail = {
            _id: result[0]._id,
            username: result[0].username,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            emailid: result[0].emailid,
            mobileno: result[0].mobileno,
            password: result[0].password,
            userRoles: result[0].userRoles[0].role.role,
          };
          ctx.body = userDetail;
        }
      });
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  },
};

module.exports = userController;
