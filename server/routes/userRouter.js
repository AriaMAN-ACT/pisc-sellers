const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const uploadImage = require('../utils/uploadImage');

const router = express.Router();

router.route('/auth/checktoken').post(authController.protect, authController.isSignedIn);
router.route('/auth/signout').get(authController.signOut);
router.route('/auth/signin').post(authController.signIn);

router.route('/')
    .get(userController.getUsers)
    .post(authController.protect, userController.setUserType, uploadImage.single('avatar'), userController.saveAvatar, userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin', 'selfUser', 'selfManager'), userController.setUserType, uploadImage.single('avatar'), userController.saveAvatar, userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin', 'selfUser', 'selfManager'),  userController.deleteUser);

module.exports = router;