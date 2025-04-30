const Conversation = require("../../models/conversation");

const createConversation = (io) => async (req, res) => {
    try {
        const { creator, participant } = req.body;

        // check if conversation already exist
        let existingConversation = await Conversation.findOne({
            $or: [
                { creator, participant },
                { creator: participant, participant: creator },
            ],
        }).populate("creator participant", "name avatar last_updated");

        console.log("existing", existingConversation);

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        // if not, create a new conversation
        const conversation = await Conversation.create({
            creator,
            participant,
        });

        const populatedConversation = await Conversation.findById(
            conversation._id
        ).populate("creator participant", "name avatar last_updated");

        io.emit("new_conversation", populatedConversation);
        // io.emit("conversation:new", conversation); // notify all clients

        res.status(201).json(populatedConversation);
    } catch (error) {
        res.status(500).json({
            error: "Failed to create conversation",
            details: error.message,
        });
    }
};

const getUserConversations = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log(userId);

        const conversations = await Conversation.find({
            $or: [{ creator: userId }, { participant: userId }],
        })
            .sort({ updatedAt: -1 })
            .populate("creator", "name avatar")
            .populate("participant", "name avatar");

        res.json(conversations);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch conversations",
            details: error.message,
        });
    }
};

// Get a single conversation by id
const getConversattionById = async (req, res) => {
    try {
        const { id } = req.params;

        const conversation = await Conversation.findById(id);
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get conversation",
            details: error.message,
        });
    }
};

// Update conversation last_updated (e.g. on message sent)
const updateConversationTimestamp = (io) => async (req, res) => {
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
            return res.status(404).json({ error: "Conversation not found" });
        }

        io.emit("conversation:update", conversation);

        res.json(conversation);
    } catch (error) {
        res.status(500).json({
            error: "Failed to update conversation",
            details: error.message,
        });
    }
};

const deleteconversation = (io) => async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Conversation.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        io.emit("conversation:delete", { id });

        res.json({ message: "Conversation deleted successfully" });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete conversation",
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
