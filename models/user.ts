import { Db } from "mongodb";
import { User } from "../types";

export async function createUser(db: Db, user: User) {
  await db.collection("users").insertOne(user);
}

export async function deleteUser(db: Db, userId: number) {
  await db.collection("users").deleteOne({ id: userId });
}

export async function deleteAllUsers(db: Db) {
  await db.collection("users").deleteMany({});
}

export async function getUser(db: Db, userId: number) {
  return await db.collection("users").findOne({ id: userId });
}
