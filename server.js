"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const db_1 = require("./utils/db");
const router_1 = require("./routes/router");
const PORT = 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.connectDB)();
        const server = (0, http_1.createServer)((req, res) => {
            (0, router_1.router)(req, res, db);
        });
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
}
startServer().catch((err) => {
    console.error("Failed to start server:", err);
});
