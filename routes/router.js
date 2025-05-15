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
exports.router = void 0;
const userController_1 = require("../controllers/userController");
function router(req, res, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const { method, url } = req;
        if (method === "GET" && url === "/load") {
            yield (0, userController_1.handleLoadData)(db, res);
        }
        else if (method === "GET" && (url === null || url === void 0 ? void 0 : url.startsWith("/users/"))) {
            const userId = parseInt(url.split("/")[2]);
            yield (0, userController_1.handleGetUser)(db, userId, res);
        }
        else if (method === "PUT" && url === "/users") {
            let body = "";
            req.on("data", chunk => (body += chunk));
            req.on("end", () => __awaiter(this, void 0, void 0, function* () {
                const user = JSON.parse(body);
                yield (0, userController_1.handlePutUser)(db, user, res);
            }));
        }
        else if (method === "DELETE" && url === "/users") {
            yield (0, userController_1.handleDeleteAllUsers)(db, res);
        }
        else if (method === "DELETE" && (url === null || url === void 0 ? void 0 : url.startsWith("/users/"))) {
            const userId = parseInt(url.split("/")[2]);
            yield (0, userController_1.handleDeleteUser)(db, userId, res);
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Endpoint not found" }));
        }
    });
}
exports.router = router;
