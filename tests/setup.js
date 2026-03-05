import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";

let mongoServer;

// Connect to in-memory database before all tests
beforeAll(async () => {
  // Set JWT_SECRET for tests
  process.env.JWT_SECRET = "test_jwt_secret_key_12345";
  
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
}, 60000);

// Clear database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);

export default app;