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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const API_URL = "https://jsonplaceholder.typicode.com";
function loadData(db) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Loading data from JSONPlaceholder...");
            const usersResponse = yield (0, node_fetch_1.default)(`${API_URL}/users`);
            const users = yield usersResponse.json();
            // for (const user of users) {
            //   await createUser(db, user);
            //   const postsResponse = await fetch(`${API_URL}/posts?userId=${user.id}`);
            //   const posts = await postsResponse.json();
            //   for (const post of posts) {
            //     await createPost(db, post);
            //     const commentsResponse = await fetch(`${API_URL}/comments?postId=${post.id}`);
            //     const comments = await commentsResponse.json();
            //     for (const comment of comments) {
            //       await createComment(db, comment);
            //     }
            //   }
            // }
            console.log("Data successfully loaded!");
        }
        catch (error) {
            console.error("Error loading data:", error);
        }
    });
}
exports.loadData = loadData;
