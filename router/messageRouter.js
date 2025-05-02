const {
    getMessageByConversation,
    sendMessage,
    markMessagesAsRead,
} = require("../controller/chat/messageController");

const router = require("express").Router();

router.post("/", sendMessage);
router.get("/:conversationId", getMessageByConversation);
router.put("/", markMessagesAsRead);

module.exports = router;
