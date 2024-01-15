import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// Define the schema for the 'music' collection
const musicSchema = new Schema(
  {
    title: String,
    notes: String,
    artist: String,
    album: String,
    genre: String,
    favorites: Number,
    active: Boolean,
  },
  {
    timestamps: true, 
  }
);

const Music = mongoose.models.Music || mongoose.model("Music", musicSchema);

export default Music;