import { Router } from "express";
import { successResponses } from "../../Utils/respones/success.respones.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authentication.middleware.js";
import { tokenTypeEnum } from "../../Utils/enums/user.enum.js";
import{roleEnum} from "../../Utils/enums/user.enum.js"
import * as userService from "./use.service.js";
const router = Router();

router.post(
  "/profile",
  authentication({ tokenType: tokenTypeEnum.ACCESS },authorization({accessRole :[roleEnum.ADMIN]})),
  userService.getprofile
);
export default router;
