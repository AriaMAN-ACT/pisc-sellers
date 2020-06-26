const multer = require('multer');

const AppError = require('./AppError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(
            new AppError(
                'invalid file input we only accept images.',
                400
            ),
            false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = upload;