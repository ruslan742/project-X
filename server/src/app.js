const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { raw } = express;

const bascetRouter = require("./routers/bascet.router");
const orderRouter = require("./routers/order.router");
const favoriteRouter = require("./routers/favorite.router");
const authRouter = require("./routers/auth.router");
const dalleRouter = require("./routers/dalle.router");
var bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({ limit: "50000kb" }));
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(raw({
//     verify: (req, res, buf, encoding) => {
//       // Проверка и обработка raw данных
//       if (buf && buf.length) {
//         req.rawBody = buf.toString(encoding || 'utf8');
//       }
//     },
//     inflate: true,

//     reviver: undefined,
//     limit: '50mb' // Увеличение лимита для raw данных
//   }));

app.use("/api/bascet", bascetRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", authRouter);
app.use("/api/v1/dalle", dalleRouter);
// app.use('/api/tokens', tokensRouter);
module.exports = app;
