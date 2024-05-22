import path from "path";
import fs from "fs";
import User from "../model/User.js";

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m"
  })
}

// create user
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting file" });
      }
      res.json({ message: "File deleted successfully" });
    });
    throw Error("User already exists");
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const user = {
    name,
    email,
    password,
    avatar: fileUrl,
  };

  const activationToken = createActivationToken(user)

  const activationUrl = `http://localhost:3000/activation/${activationToken}`

  try {
    
  } catch (error) {
    return next(new Error)
  }

  // const newUser = await User.create(user);

  // res.status(201).json({
  //   success: true,
  //   newUser,
  // });
};
