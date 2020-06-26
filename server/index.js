const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.join(__dirname, './config.env')
});

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const next = require('next');

const APIRouter = require('./routes/APIRouter');
const errorController = require('./controllers/errorController');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.use(express.json({
            limit: '10kb'
        }));

        server.use(cookieParser());

        server.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "*");
            next();
        });

        server.use('/api/v1', APIRouter);

        server.use(errorController);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        const PORT = process.env.PORT || 3000;

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}`);
        });

        const DB =
            process.env.DATABASE
                .replace('<password>', process.env.DATABASE_PASSWORD)
                .replace('<dbname>', process.env.DATABASE_NAME);

        mongoose.connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(con => {
            console.log('Connected to DB successfully.');
        });
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });