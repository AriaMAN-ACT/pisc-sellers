const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
    .get(userController.getUsers)
    .post(userController.setUserType, userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.setUserType, userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;