import mongoose from "mongoose";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export async function connectDb() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(process.env.MONGO_URI, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Connected to Mongoose:", mongoose.connection.name);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process with failure code
    }
  }
