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

        const conversations = await Conversation.find({
            $or: [{ 'creator.id': userId }, { 'participant.id': userId }],
        }).sort({ updatedAt: -1 });

        res.json(conversations);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch conversations',
            details: error.message,
        });
    }
};

// Get a single conversation by id
const getConversattionById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const conversation = await Conversation.findById(id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to get conversation',
            details: error.message,
        });
    }
};

// Update conversation last_updated (e.g. on message sent)
const updateConversationTimestamp = async (req, res) => {
    try {
        const { id } = req.params;

        const conversation = await Conversation.findByIdAndUpdate(
            id,
            {
                last_updated: Date.now(),
            },
            { new: true }
        );

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to update conversation',
            details: error.message,
        });
    }
};

const deleteconversation = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Conversation.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete conversation',
            details: error.message,
        });
    }
};

module.exports = {
    createConversation,
    getUserConversations,
    getConversattionById,
    updateConversationTimestamp,
    deleteconversation,
};
