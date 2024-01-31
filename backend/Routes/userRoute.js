const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema");
const Notes = require("../Schema/notesSchema");
const z = require("zod");
const dotenv = require("dotenv");
dotenv.config();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(`${process.env.Encryption_key}`);
const jwt = require("jsonwebtoken");
const {authMiddleware}  = require("../Middleware/auth")

//Signup logic

const signupValidate = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupValidate.safeParse(req.body);

  try {
    if (!success) {
      return res.status(400).json({
        message: "Signup error",
      });
    }
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }
    const hashedPassword = cryptr.encrypt(req.body.password);
    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Signup Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//login logic

const loginValidate = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/login", async (req, res) => {
  const { success } = loginValidate.safeParse(req.body);

  try {
    if (!success) {
      return req.status(400).json({
        message: "Incorrect email or Password",
      });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password ",
      });
    }
    console.log("here");
    const decryptedPassword = cryptr.decrypt(user.password);
    if (decryptedPassword !== req.body.password) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, name: user.firstname },
      process.env.jwt_secret_key
    );

    res
      .cookie("authToken", token, {
        httpOnly: true,
      })
      .json({
        message: "Login Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


module.exports = router;
