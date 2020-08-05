import { Schema, model } from "mongoose";

const schemaUser = new Schema({
   Name: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: (str) => (str.length > 3),
         message: "This name is too short - name must be more 3 symbols!",
      },
   },
   Token: {
      type: String,
   },
   Password: {
      type: String,
      required: true,
      validate: {
         validator: (str) => (str.length > 8),
         message: "This password must be more 8 symbols!",
      },
   },
});

export default model("Users", schemaUser);