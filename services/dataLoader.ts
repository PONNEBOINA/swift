import fetch from "node-fetch";
import { Db } from "mongodb";
import { createUser } from "../models/user";
import { createPost } from "../models/post";
import { createComment } from "../models/commet";
import { User, Post, Comment } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export async function loadData(db: Db) {
  try {
    console.log("Loading data from JSONPlaceholder...");

   
    const usersResponse = await fetch(`${API_URL}/users`);
    const users = await usersResponse.json();

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
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
