import express from "express";
import { connectDb } from "./config/db";
import { createHandler } from "graphql-http/lib/use/express";
import { User } from "./model/users";
import { Types } from "mongoose";
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const app = express();

connectDb();

const GraphQlUserType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLString },
    index: { type: GraphQLInt },
    name: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    registered: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    favoriteFruit: { type: GraphQLString },
    company: {
      type: new GraphQLObjectType({
        name: "Company",
        fields: {
          title: { type: GraphQLString },
          email: { type: GraphQLString },
          phone: { type: GraphQLString },
          location: {
            type: new GraphQLObjectType({
              name: "Location",
              fields: {
                country: { type: GraphQLString },
                address: { type: GraphQLString },
              },
            }),
          },
        },
      }),
    },
    tags: { type: new GraphQLList(GraphQLString) },
    eyeColor: { type: GraphQLString },
  },
});

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(GraphQlUserType),
      args: {
        name: { type: GraphQLString },
        company: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      resolve: async (_parent, args) => {
        const users = await User.find({
          name: RegExp(args.name, "ig"),
          "company.title": RegExp(args.company, "ig"),
          "company.location.country": RegExp(args.country, "ig"),
        });
        return users;
      },
    },
    user: {
      type: GraphQlUserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_parent, args) => {
        const id = Types.ObjectId.createFromHexString(args.id);

        const user = await User.findById(id);

        return user;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: null,
});

app.use("/graphql", createHandler({ schema }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
