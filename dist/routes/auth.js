"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.post("/register", (req, res) => {
    const { email, pass, confPass } = req.body;
    console.log(email, pass, confPass);
});
exports.default = router;
