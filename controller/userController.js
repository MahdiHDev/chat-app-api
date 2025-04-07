const User = require('../models/Users');

const searchuser = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res
                .status(400)
                .json({ message: 'Queary perameter is required' });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
            ],
        });

        res.status(200).json(users);
    } catch (error) {
        console.log('Error fecthing users: ', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { searchuser };
