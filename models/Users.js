const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/dbnnwoges/image/upload/v1743675677/istockphoto-1300845620-612x612_dgcros.jpg',
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
