import { Db } from "mongodb";
import { loadData } from "../services/dataLoader";
import { createUser, deleteUser, deleteAllUsers, getUser } from "../models/user";
import { getPostsByUserId, deletePostsByUserId } from "../models/post";
import { deleteCommentsByPostId, getCommentsByPostId } from "../models/commet";

import { User } from "../types";

export async function handleLoadData(db: Db, res: any) {
  await loadData(db);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Data loaded successfully" }));
}

export async function handleGetUser(db: Db, userId: number, res: any) {
  const user = await getUser(db, userId);

  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  const posts = await getPostsByUserId(db, userId);
  for (const post of posts) {
    post.comments = await getCommentsByPostId(db, post.id);
  }
  
  user.posts = posts;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}

export async function handlePutUser(db: Db, user: User, res: any) {
  const existingUser = await getUser(db, user.id);

  if (existingUser) {
    res.writeHead(409, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User already exists" }));
    return;
  }

  await createUser(db, user);
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User created successfully" }));
}

export async function handleDeleteUser(db: Db, userId: number, res: any) {
  const user = await getUser(db, userId);

  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  await deleteUser(db, userId);
  await deletePostsByUserId(db, userId);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User and related posts/comments deleted" }));
}

export async function handleDeleteAllUsers(db: Db, res: any) {
  await deleteAllUsers(db);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "All users deleted successfully" }));
}
