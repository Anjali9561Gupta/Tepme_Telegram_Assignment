import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { schema } from "./graphql/schema";
import cors from "cors";

// Create Yoga instance
const yoga = createYoga({
  schema,
  // Enable CORS directly in Yoga configuration

  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Create HTTP server

const server = createServer((req, res) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  // Use Yoga handler for all other requests
  yoga.handle(req, res);
});

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
