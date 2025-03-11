import mongoose from "mongoose";

export const connectDb = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/learnings")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting to database");
    });
};
