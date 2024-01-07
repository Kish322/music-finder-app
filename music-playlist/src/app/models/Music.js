import mongoose, { Schema } from "mongoose";

// Connect to MongoDB using the MONGODB_URI from environment variables
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// Define the schema for the 'music' collection
const musicSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Define the Music model using the schema
const Music = mongoose.models.Music || mongoose.model("Music", musicSchema);

// Export the Music model
export default Music;