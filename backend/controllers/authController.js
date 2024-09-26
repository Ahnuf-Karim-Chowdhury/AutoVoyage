import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/helpers.js"
import jwt from "jsonwebtoken";
import cloudinary from '../cloudinaryConfig.js'; // Adjust the path if necessary

const lifetime = 31 * 24 * 60 * 60 * 1000;

export const register = async (req, res) => {
    try {
        const { firstName, lastName, telephone, email, password } = req.body;

        const emailExists = await User.findOne({ email }).select(["email"]);
        if (emailExists)
            return res.status(400).send("Email already in use");
        const telExists = await User.findOne({ telephone }).select(["telephone"]);
        if (telExists)
            return res.status(400).send("Phone no. already in use");

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            telephone,
            email,
            password: hashedPassword,
        });
        const createdUser = await User.create(newUser);
        console.log(createdUser);
        return res.status(201).send(createdUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select(["-__v"]);
        if (!user) {
            return res.status(404).json("User not found");
        }

        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(400).send("Wrong password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: lifetime }
        );

        res.cookie("token", token, {
            maxAge: lifetime,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        return res.status(200).send("login successful");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        return res.status(200).send("Logout successful");

    } catch (error) {
        return res.status(500).send(error);
    }
}

export const getProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in getProfile:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  export const updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { firstName, lastName, email } = req.body;
  
      // Fetch the current user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Handle file upload
      let profilePictureUrl = user.profilePicture; // Default to current profile picture
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'profile_pictures',
          width: 150,
          height: 150,
          crop: 'fill',
        });
        profilePictureUrl = result.secure_url;
      }
  
      // Update user profile in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email, profilePicture: profilePictureUrl },
        { new: true }
      ).select('-password');
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error in updateProfile:", error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  };
  
  
  


export const uploadProfilePicture = async (req, res) => {
  try {
    const file = req.file; // Assuming you use multer for file upload

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'profile_pictures',
      width: 150,
      height: 150,
      crop: 'fill'
    });

    // Save URL in the database
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).send('Internal Server Error');
  }
};

  