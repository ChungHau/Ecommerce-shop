import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(123);
  if (!token) return next(new ErrorHandler("Please login to continue", 400));

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  console.log("isAuthenticated");
  next();
};
