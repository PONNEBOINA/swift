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
exports.getUser = exports.deleteAllUsers = exports.deleteUser = exports.createUser = void 0;
function createUser(db, user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection("users").insertOne(user);
    });
}
exports.createUser = createUser;
function deleteUser(db, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection("users").deleteOne({ id: userId });
    });
}
exports.deleteUser = deleteUser;
function deleteAllUsers(db) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection("users").deleteMany({});
    });
}
exports.deleteAllUsers = deleteAllUsers;
function getUser(db, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection("users").findOne({ id: userId });
    });
}
exports.getUser = getUser;
