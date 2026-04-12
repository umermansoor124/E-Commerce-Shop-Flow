import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User.js'


export const register = async (req, res) => {
    console.log('Register hit!')
    try {
        const { name, email, password } = req.body
        console.log(name, email, password)
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ message: "Email Already Exist" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedpassword
        })

        res.status(201).json({ message: "User Registered Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}


export const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logout Successfully" })
}