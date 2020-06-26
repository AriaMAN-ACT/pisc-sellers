const {promisify} = require('util');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/User');
const catchRequest = require('../utils/catchRequest');
const AppError = require('../utils/AppError');

exports.protect = catchRequest(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        throw new AppError('You are not logged in.', 401);
    }
    const decodedToken = await promisify(jsonWebToken.verify)(token, process.env.JSON_WEB_TOKEN_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
        throw new AppError(
            'The user belong to the token that no longer exists.',
            401
        );
    }
    req.user = user;
    next();
});

exports.restrictTo = (...rotes) => {
    return catchRequest(
        async (req, res, next) => {
            if (rotes.includes(req.user.rote)) {
                return next();
            }
            if (rotes.includes('selfUser')) {
                if (req.user._id.toString() === req.params.id) {
                    return next();
                }
            }
            if (rotes.includes('selfManager')) {
                if (req.user.manager.toString() === req.params.id) {
                    return next();
                }
            }
            throw new AppError('You don\'t have permission to do that', 403);
        }
    );
};