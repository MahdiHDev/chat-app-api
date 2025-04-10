const {
    createConversation,
    getUserConversations,
} = require('../controller/chat/conversationController');

const router = require('express').Router();

router.post('/converstion', createConversation);
router.get('/converstion', getUserConversations);

module.exports = router;
