import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { LOCAL_HOST } from "../variables/variables";

const homeRouter = express.Router();

homeRouter.use(cors({
   origin: LOCAL_HOST,
   optionSuccessStatus: 200,
}));
homeRouter.use(bodyParser.json());

homeRouter.route('/homepage')
   .post((req, res, next) => {
      res.json('Seccess!');
   });

export default homeRouter;