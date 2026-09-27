import {
  ACCESS_ADMIN_SECRET_TOKEN,
  REFRESH_ADMIN_SECRET_TOKEN,
  ACCESS_USER_SECRET_TOKEN,
  REFRESH_USER_SECRET_TOKEN,
  ACCESS_USER_SECRET_TOKEN_EXPIRES_IN,
  REFRESH_ADMIN_SECRET_TOKEN_EXPIRES_IN,
  ACCESS_ADMIN_SECRET_TOKEN_EXPIRES_IN,
  REFRESH_USER_SECRET_TOKEN_EXPIRES_IN,
} from "../../config/config.service.js";
import jwt from "jsonwebtoken";
import { roleEnum, signatureEnum } from "../enums/user.enum.js";
export const generateToken = ({
  pyload,
  sekretKey,
  option = { expiresIn: ACCESS_USER_SECRET_TOKEN_EXPIRES_IN },
}) => {
  return jwt.sign(pyload, sekretKey, option);
};

export const verifyToken = ({ token, secretKey }) => {
  return jwt.verify(token, secretKey);
};

export const getSignature = ({ signatureLevel = signatureEnum.USER }) => {
  let signature = { accessSignature: undefined, refreshSignature: undefined };
  switch (signatureLevel) {
    case signatureEnum.ADMIN:
      ((signature.accessSignature = ACCESS_ADMIN_SECRET_TOKEN),
        (signature.refreshSignature = REFRESH_ADMIN_SECRET_TOKEN));
      break;

    case signatureEnum.USER:
      ((signature.accessSignature = ACCESS_USER_SECRET_TOKEN),
        (signature.refreshSignature = REFRESH_USER_SECRET_TOKEN));
      break;
    default:
      ((signature.accessSignature = ACCESS_USER_SECRET_TOKEN),
        (signature.refreshSignature = REFRESH_USER_SECRET_TOKEN));
  }
  return signature;
};

export const getNewLoginCredentials = async (user) => {
  let signature = await getSignature({
    signatureLevel:
      user.role === roleEnum.ADMIN ? signatureEnum.ADMIN : signatureEnum.USER,
  });

  const accessToken = await generateToken({
    pyload: { id: user.id },
    sekretKey: signature.accessSignature,
    option: {
      expiresIn:
        user.role !== roleEnum.ADMIN
          ? ACCESS_USER_SECRET_TOKEN_EXPIRES_IN
          : ACCESS_ADMIN_SECRET_TOKEN_EXPIRES_IN,
    },
  });

  const refreshToken = await generateToken({
    pyload: { id: user.id },
    sekretKey: signature.refreshSignature,
    option: {
      expiresIn:
        user.role !== roleEnum.ADMIN
          ? REFRESH_USER_SECRET_TOKEN_EXPIRES_IN
          : REFRESH_ADMIN_SECRET_TOKEN_EXPIRES_IN,
    },
  });
  return { accessToken, refreshToken };
};
