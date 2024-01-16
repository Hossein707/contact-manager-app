const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group');


router.get('/groups', groupController.getAllGroups);

router.get('/groups/:groupId', groupController.getSingleGroup);

router.post('/groups', groupController.createGroup);

router.put('/groups/:groupId', groupController.editGroup);

router.delete('/groups/:groupId', groupController.deleteGroup);

module.exports = router;