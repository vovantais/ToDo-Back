import Task from "../modules/taskSchema";

export const getTasks = async (req, res, next) => {
   let MessageResult;
   await Task.find({})
      .then(res => {
         MessageResult = res;
      })
      .catch(err => {
         MessageResult = {
            message: err.message,
            type: 'Error',
         };
      });
   await res.json(MessageResult)
};

export const postTask = async (req, res, next) => {
   let MessageResult;
   await Task.create({
      value: req.body.value,
   })
      .then(res => {
         MessageResult = {
            message: 'Task added successfully!',
            type: "Seccess!",
         };
      })
      .catch(err => {
         res.status(500);
         MessageResult = {
            message: 'Error happend during creating task! ' + err.message,
            type: "Error",
         };
      });
   await res.json(MessageResult);
};

export const putTask = async (req, res, next) => {
   let MessageResult;
   const task = await Task.findOne({ _id: req.body.id })
      .then(async res => {
         task.isDone = !task.isDone;
         await task.save();
         MessageResult = {
            message: 'Task change successfully!',
            type: "Seccess!",
            updated: task,
         };
      })
      .catch(err => {
         res.status(404);
         MessageResult = {
            message: 'Error happend during making done! Such task isn`t find.',
            type: 'Error',
         };
      });
   await res.json(MessageResult);
};

export const deleteTask = async (req, res, next) => {
   console.log(req.body);
   const tasks = await Task.find({})
   if (!tasks) {
      return res.status(404).json({
         message: 'Error happend during deleting! Such task isn`t find',
         type: 'Error',
      })
   }
   tasks.splice(req.body.indexId, 1);
   // Todo
   // await tasks.save();
   res.status(200).json({
      message: 'Task delete successfully!',
      type: 'Seccess',
   })
};