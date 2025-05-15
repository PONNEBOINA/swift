import { Db } from "mongodb";
import { Comment } from "../types";


export async function createComment(db: Db, comment: Comment) {
  await db.collection("comments").insertOne(comment);
}


export async function getCommentsByPostId(db: Db, postId: number) {
  return await db.collection("comments").find({ postId }).toArray();
}


export async function deleteCommentsByPostId(db: Db, postId: number) {
  await db.collection("comments").deleteMany({ postId });
}
