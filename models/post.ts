import { Db } from "mongodb";
import { Post } from "../types";


export async function createPost(db: Db, post: Post) {
  await db.collection("posts").insertOne(post);
}


export async function getPostsByUserId(db: Db, userId: number) {
  return await db.collection("posts").find({ userId }).toArray();
}


export async function deletePostsByUserId(db: Db, userId: number) {
  await db.collection("posts").deleteMany({ userId });
}
