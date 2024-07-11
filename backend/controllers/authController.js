import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/helpers.js"
import jwt from "jsonwebtoken";

const lifetime = 31 * 24 * 60 * 60 * 1000;

export const register = async (req, res) => {
    try {
        const { firstName, lastName, telephone, email, password } = req.body;
        // console.log(`Password: ${password}`);
        // console.log(`first name: ${firstName}`);

        const emailExists = await User.findOne({ email }).select(["email"]);
        if (emailExists)
            return res.status(400).json({ error: "Email already in use" });
        const telExists = await User.findOne({ telephone }).select(["telephone"]);
        if (telExists)
            return res.status(400).json({ error: "Phone no. already in use" });

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
        return res.status(500).json("Internal Server Error");
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