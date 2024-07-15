const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const bascetRouter = require('./routers/bascet.router');
const favoriteRouter = require('./routers/favorite.router');
 const authRouter = require('./routers/auth.router');
 const dalleRouter = require('./routers/dalle.router');
// const tokensRouter = require('./routes/tokensRouter');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/bascet', bascetRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/auth', authRouter);
app.use('/api/v1/dalle', dalleRouter);
// app.use('/api/tokens', tokensRouter);
module.exports = app;