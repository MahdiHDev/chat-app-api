const mongoose = require("mongoose");

const messagechema = mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // createdAt and updatedAt will be auto-handled
    }
);

const Message = mongoose.model("Message", messagechema);

module.exports = Message;
