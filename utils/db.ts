import { MongoClient, Db } from "mongodb"; 

const url = "mongodb://localhost:27017"; 
const dbName = "backend"; 

let db: Db;


export async function connectDB(){
  if (db) return db; 

  const client = new MongoClient(url);
  await client.connect(); 
  db = client.db(dbName); 
  console.log("Connected to MongoDB");
  return db;
}
