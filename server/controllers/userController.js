const sharp = require('sharp');

const factory = require('./handlerFactory');
const User = require('../models/User');
const catchRequest = require('../utils/catchRequest');

exports.getUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.setUserType = catchRequest(
    (req, res, next) => {
        req.body.rote = undefined;
        next();
    }
);

exports.saveAvatar = catchRequest(
    async (req, res, next) => {
        if (!req.file) {
            return next();
        }
        const ext = req.file.mimetype.split('/')[1];
        req.file.filename = `user-avatar-${req.user.id}-${Date.now()}.${ext}`;
        req.body.avatarImage = req.file.filename;
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`uploads/useravatar/${req.files.avatarImage[0].filename}`);
    }
);