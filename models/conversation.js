const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        last_updated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
