const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try {
        // check for existing signed token in cookie
        const token = req.signedCookies?.[process.env.COOKIE_NAME];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({
                message: 'User already logged in',
                user: {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    mobile: decoded.mobile,
                    role: decoded.role,
                },
                token,
            });
        }

        const { emailOrMobile, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
        });

        if (!user) {
            return res.status(500).json({
                message: 'user not found',
            });
        }

        // password match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const newToken = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );

        // set cookie
        const cookieName = process.env.COOKIE_NAME || 'token';
        res.cookie(cookieName, newToken, {
            maxAge: process.env.JWT_EXPIRY,
            // httpOnly: true,
            signed: true,
            secure: false,
        });

        console.log(cookieName);

        // send response
        res.status(200).json({
            message: 'Login Successful',
            user: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                avatar: user.avatar,
            },
            token: newToken,
        });
    } catch (err) {
        console.log('Login Error', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = { handleLogin };
