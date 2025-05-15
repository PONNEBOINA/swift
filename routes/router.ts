import { IncomingMessage, ServerResponse } from "http";
import { Db } from "mongodb";
import {
  handleLoadData,
  handleGetUser,
  handlePutUser,
  handleDeleteUser,
  handleDeleteAllUsers
} from "../controllers/userController";
import { User } from "../types";

export async function router(req: IncomingMessage, res: ServerResponse, db: Db) {
  const { method, url } = req;

  if (method === "GET" && url === "/load") {
    await handleLoadData(db, res);
  } else if (method === "GET" && url?.startsWith("/users/")) {
    const userId = parseInt(url.split("/")[2]);
    await handleGetUser(db, userId, res);
  } else if (method === "PUT" && url === "/users") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      const user: User = JSON.parse(body);
      await handlePutUser(db, user, res);
    });
  } else if (method === "DELETE" && url === "/users") {
    await handleDeleteAllUsers(db, res);
  } else if (method === "DELETE" && url?.startsWith("/users/")) {
    const userId = parseInt(url.split("/")[2]);
    await handleDeleteUser(db, userId, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
}
