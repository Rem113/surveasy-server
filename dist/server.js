"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const port = process.env.PORT || 5000;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/auth", auth_1.default);
app.listen(port, () => console.log(`Listening on port ${port}!`));
