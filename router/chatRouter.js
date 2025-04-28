const express = require("express");

const chatRouter = (io) => {
    const {
        createConversation,
        getUserConversations,
        getConversattionById,
        updateConversationTimestamp,
        deleteconversation,
    } = require("../controller/chat/conversationController");

    const router = express.Router();

    router.post("/conversation", createConversation(io));
    router.get("/conversation", getUserConversations);
    router.get("/singleconversation/:id", getConversattionById);
    router.put("/updateconversation/:id", updateConversationTimestamp);
    router.delete("/deleteconversation/:id", deleteconversation);

    return router;
};

module.exports = chatRouter;
