import jwt from "jsonwebtoken";
import User from "../model/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendMail from "../utils/sendMail.js";

// create activation token
const createActivationToken = async (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// create user
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const user = {
      name,
      email,
      password,
    };

    const activationToken = await createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}/`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// activate user
export const activateUser = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400));
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "blood",
        url: avatar,
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Please provide the all fields!", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User doesn't exists!", 400));

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// load user
export const getUser = async (req, res, next) => {
  try {
    console.log(req.body, 'getUser');

    const user = await User.findById(req.user.id);
    if (!user) return next(new ErrorHandler("User doesn't exists", 400));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
