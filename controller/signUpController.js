const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleSignUp = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email or mobile already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        // save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.email,
                role: newUser.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.JWT_EXPIRY,
            httpOnly: true,
            signed: true,
        });

        res.status(201).json({
            message: 'User Registered Successfully!',
            user: {
                name,
                email,
                mobile,
                role: newUser.role,
                avatar: newUser.avatar,
            },
            token, // send the json web token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { handleSignUp };
