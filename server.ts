import { createServer } from "http";
import { connectDB } from "./utils/db" ;
import { router } from "./routes/router";

const PORT = 3000;

async function startServer() {
  const db = await connectDB();

  const server = createServer((req, res) => {
    router(req, res, db);
  });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
