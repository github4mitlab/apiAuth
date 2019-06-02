const express = require("express");
const mongan = require("morgan");
const bodyParser = require("body-parser");
const userRouter = require("./routers/users");
const app = express();

//Middlewares
app.use(mongan("dev"));
app.use(bodyParser.json());

// Rouers
app.use("/users", userRouter);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`http://localhost:${PORT}`));
