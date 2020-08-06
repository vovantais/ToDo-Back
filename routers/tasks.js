import express from 'express';
import * as tasksController from '../controllers/tasks';

const tasksRouter = express.Router();

tasksRouter.route('/')
   .get(tasksController.getTasks)
   .post(tasksController.postTask)
   .put(tasksController.putTask)
   .delete(tasksController.deleteTask);

export default tasksRouter;