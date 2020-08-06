import { Schema, model } from "mongoose";

const taskSchema = new Schema({
   title: {
      type: String,
      validate: {
         validator: str => (str.length > 5),
         message: 'Title must be 5 symbols at least!',
      }
   },
   isDone: {
      type: Boolean,
      default: false,
   }
})

export default model("Task", taskSchema);