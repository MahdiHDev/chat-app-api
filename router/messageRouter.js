const {
    getMessageByConversation,
    sendMessage,
    markMessagesAsRead,
    deleteMessage,
} = require("../controller/chat/messageController");

const router = require("express").Router();

router.post("/", sendMessage);
router.get("/:conversationId", getMessageByConversation);
router.put("/", markMessagesAsRead);
router.delete("/:messageId", deleteMessage);

module.exports = router;
