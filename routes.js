const express = require("express");
const router = express.Router();
const profileRoutes = require("./profile");
const invoiceRoutes = require("./invoice");

router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.use("/profile", profileRoutes);
router.use("/invoice", invoiceRoutes);

// export router
module.exports = router;
