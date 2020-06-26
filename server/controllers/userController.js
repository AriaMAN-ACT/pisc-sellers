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