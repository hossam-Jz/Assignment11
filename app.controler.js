import { glopalHandelError } from "./src/Utils/respones/err.respones.js";
import {authController,userConroller} from "./src/Modules/index.js";
import{connectDB} from "./src/DB/Models/connection.js";
import cors from "cors"
export const bootstrap = async (app, express) => {
  app.use(express.json(),cors());
  await connectDB();
  app.use("/api/auth",authController);
 app.use("/api/user",userConroller);

  app.use(glopalHandelError);
};
