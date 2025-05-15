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
exports.handleDeleteAllUsers = exports.handleDeleteUser = exports.handlePutUser = exports.handleGetUser = exports.handleLoadData = void 0;
const dataLoader_1 = require("../services/dataLoader");
const user_1 = require("../models/user");
const post_1 = require("../models/post");
const commet_1 = require("../models/commet");
function handleLoadData(db, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, dataLoader_1.loadData)(db);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Data loaded successfully" }));
    });
}
exports.handleLoadData = handleLoadData;
function handleGetUser(db, userId, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_1.getUser)(db, userId);
        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User not found" }));
            return;
        }
        const posts = yield (0, post_1.getPostsByUserId)(db, userId);
        for (const post of posts) {
            post.comments = yield (0, commet_1.getCommentsByPostId)(db, post.id);
        }
        user.posts = posts;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
    });
}
exports.handleGetUser = handleGetUser;
function handlePutUser(db, user, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, user_1.getUser)(db, user.id);
        if (existingUser) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User already exists" }));
            return;
        }
        yield (0, user_1.createUser)(db, user);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User created successfully" }));
    });
}
exports.handlePutUser = handlePutUser;
function handleDeleteUser(db, userId, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_1.getUser)(db, userId);
        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User not found" }));
            return;
        }
        yield (0, user_1.deleteUser)(db, userId);
        yield (0, post_1.deletePostsByUserId)(db, userId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User and related posts/comments deleted" }));
    });
}
exports.handleDeleteUser = handleDeleteUser;
function handleDeleteAllUsers(db, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, user_1.deleteAllUsers)(db);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "All users deleted successfully" }));
    });
}
exports.handleDeleteAllUsers = handleDeleteAllUsers;
