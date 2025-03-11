import { Schema, model } from "mongoose";

const user = new Schema({
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  registered: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  favoriteFruit: {
    type: String,
    required: true,
  },
  company: {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  tags: {
    type: [String],
    default: [],
  },
  eyeColor: {
    type: String,
    required: true,
  },
});

export const User = model("Users", user);
