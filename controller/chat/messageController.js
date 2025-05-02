const Message = require("../../models/message");
const Conversation = require("../../models/conversation");

// Create a new message
const sendMessage = async (req, res) => {
    try {
        const { conversationId, sender, message } = req.body;

        if (!conversationId || !sender || !message) {
            return res
                .status(400)
                .json({ message: "All fields are required." });
        }

        const newMessage = await Message.create({
            conversationId,
            sender,
            message,
        });

        // Update last_updated field in conversation
        await Conversation.findByIdAndUpdate(conversationId, {
            last_updated: Date.now(),
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Error sending message", error });
    }
};

// Get all messages of a conversation
const getMessageByConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId }).populate(
            "sender",
            "name avatar"
        );

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetchingg messages", error });
    }
};

// Mark all messages in a conversation as read by a user
const markMessagesAsRead = async (req, res) => {
    try {
        const { conversationId, userId } = req.body;

        await Message.updateMany(
            { conversationId, sender: { $ne: userId }, isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to mark messages as read",
            error,
        });
    }
};

module.exports = {
    sendMessage,
    getMessageByConversation,
    markMessagesAsRead,
};
