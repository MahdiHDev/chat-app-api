const Conversation = require('../../models/conversation');

const createConversation = async (req, res) => {
    try {
        const { creator, participant } = req.body;

        const conversation = await Conversation.create({
            creator,
            participant,
        });

        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create conversation',
            details: error.message,
        });
    }
};

const getUserConversations = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log(userId);

        // const conversations = await Conversation.find({
        //     $or: [{ 'creator.id': userId }, { 'participant.id': userId }].sort({
        //         updatedAt: -1,
        //     }),
        // });

        const conversations = await Conversation.find({
            $or: [{ 'creator.id': userId }, { 'participant.id': userId }]
        });

        res.json(conversations);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch conversations',
            details: error.message,
        });
    }
};

module.exports = { createConversation, getUserConversations };
