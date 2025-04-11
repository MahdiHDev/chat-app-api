const {
    createConversation,
    getUserConversations,
    getConversattionById,
    updateConversationTimestamp,
    deleteconversation,
} = require('../controller/chat/conversationController');

const router = require('express').Router();

router.post('/converstion', createConversation);
router.get('/converstion', getUserConversations);
router.get('/singleconverstion/:id', getConversattionById);
router.put('/updateconversation/:id', updateConversationTimestamp);
router.delete('/deleteconversation/:id', deleteconversation);

module.exports = router;
