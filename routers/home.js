import express from "express";

const homeRouter = express.Router();

homeRouter.route('/homepage')
   .get((req, res, next) => {
      res.send('Home Page Seccess!');
   });

export default homeRouter;