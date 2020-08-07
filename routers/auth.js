import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Users from "../modules/UserSchema";
import { LOCAL_HOST, SECRET_WORD, SALT_ROUNDS } from "../variables/variables";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const authRoute = express.Router();

// кросс доменные запросы
authRoute.use(cors({
   origin: LOCAL_HOST,
   optionSuccessStatus: 200,
}));
authRoute.use(bodyParser.json());

authRoute.route("/login")
   .post(async (req, res) => {
      const { Name, pwdHash } = req.body;
      const user = await Users.findOne({ Name });
      if (!user) {
         res.status(404).json("This user wasn`t found!");
      }
      const passwordResult = await bcrypt.compareSync(req.body.Password, user.pwdHash);
      if (!passwordResult) {
         res.status(401).json("This password is not correct!");
      }
      await jwt.verify(user.Token, SECRET_WORD, (err, decoded) => {
         if (err) {
            jwt.sign({
               userName: Name,
            }, SECRET_WORD,
               {
                  expiresIn: '7d'
               }
            )
            res.status(200).json({ Token: user.Token, message: 'You login Successfully!' });
         } else {
            res.status(200).json({ Token: user.Token, message: 'You login Successfully!' });
         }
      })
   });

authRoute.route("/registration")
   .post(async (req, res) => {
      const { Name, pwdHash } = req.body;
      const candidate = await Users.findOne({ Name });
      if (candidate) {
         res.status(403).json("This name is occupied!");
      }
      const NewUser = new Users({
         Name,
         pwdHash: await bcrypt.hash(req.body.Password, SALT_ROUNDS),
         Token: jwt.sign({
            userName: Name,
         }, SECRET_WORD,
            {
               expiresIn: '7d'
            }
         )
      })
      NewUser.save()
         .then(() => res.status(200).json("You are registered successfully!"))
         .catch(({ message }) => {
            res.status(403).json(message)
         });
   });

export default authRoute;

