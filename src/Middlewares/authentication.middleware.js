import { findById } from "../DB/DB.repository.js";
import { userModel } from "../DB/Models/user.model.js";
import { signatureEnum, tokenTypeEnum } from "../Utils/enums/user.enum.js";
import {
  NotFoundException,
  BadRequestException,
} from "../Utils/respones/err.respones.js";
import { getSignature, verifyToken } from "../Utils/token/token.js";
import jwt from "jsonwebtoken";

export const docededToken = async ({
  authorization,
  tokenType = tokenTypeEnum.ACCESS,
}) => {
  const [Bearer, token ] = authorization.split(" ") || [];

  let signature = await getSignature({
    signatureLevel:
      Bearer === "ADMIN"
        ? signatureEnu.ADMIN
        : Bearer === "USER"
          ? signatureEnum.USER
          : BadRequestException({ message: "Invalid signature" }),
  });
  const decoded = await verifyToken({
    token,
    secretKey:
      tokenType === tokenTypeEnum.ACCESS
        ? signature.accessSignature
        : signature.refreshSignature,
  });
  const user = await findById({ model: userModel, id: decoded.id });
  if (!user) NotFoundException({ message: "user not found" });
  return { user, decoded };
};

export const authentication = ({ tokenType = tokenTypeEnum.ACCESS }) => {
  return async (req, res, next) => {
    const { user, decoded } =
      (await docededToken({
        authorization: req.headers.authorization,
        tokenType,
      })) || {};

    req.user = user;
    req.decoded = decoded;
    return next();
  };
};

export const authorization = ({accessRole = []})=>{
    return async (req,res,next)=>{
        if(!accessRole.includes(req.user.role)) throw ForbiddenException("Unauthorized")
        return next()
    }
}
