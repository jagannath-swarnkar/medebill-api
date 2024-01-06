const mongoose = require("mongoose");
require("dotenv").config();

console.info("connecting to db..............");
mongoose
    .connect(process.env.DB_CONNECTION, {})
    .then(() => {
        console.info("MongoDB connected!");
    })
    .catch((err) => {
        console.error("MongoDB Error!", err);
    });
