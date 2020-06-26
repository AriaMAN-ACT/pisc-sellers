const express = require('express');

const userRouter = require('./userRouter');

const router = express.Router({mergeParams: true});

router.use('/users', userRouter);

module.exports = router;