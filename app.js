const express = require("express");
const mongan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routers/users");

const app = express();
const db = require("./config/key").mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then( () => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);


//Middlewares
app.use(mongan("dev"));
app.use(bodyParser.json());

// Rouers
app.use("/users", userRouter);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`http://localhost:${PORT}`));
