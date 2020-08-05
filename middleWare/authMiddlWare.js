import { SECRET_WORD } from "../variables/variables";
import jwt from "jsonwebtoken";

export const AuthMiddleWare = async (req, res, next) => {
   const authHeader = req.body.Token;
   await jwt.verify(authHeader, SECRET_WORD, (err, decoded) => {
      if (err) {
         res.status(401).json('This user isn`t Authorization!')
      } else {
         authHeader.decoded
         next();
      }
   })
}