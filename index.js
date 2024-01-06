const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
const routes = require("./routes");
const PORT = process.env.PORT || "8000";
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Application is running on port: ${PORT}`);
});
