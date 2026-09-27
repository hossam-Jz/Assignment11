import { SALT_ROUND } from "../../config/config.service.js";
import { hashEnum } from "../enums/security.enum.js";
import bcrypt from "bcrypt";
import * as argon2 from "argon2";
import { BadRequestException } from "../respones/err.respones.js";
export const generateHash = async ({
  plainText,
  saltRound = SALT_ROUND,
  algorithm = hashEnum.bcrypt,
}) => {
  let hashResult = "";
  switch (algorithm) {
    case hashEnum.bcrypt:
      hashResult = await bcrypt.hash(plainText, saltRound);
      break;
    case hashEnum.argon2:
      hashResult = await argon2.hash(plainText);
      break;
    default:
      throw BadRequestException({ message: "Unsupported hashing algorithm" });
  }
  return hashResult;
};

export const compareHash = async ({
  plainText,
  cipherText,
  algorithm = hashEnum.bcrypt,
}) => {
  let match = false;
  switch (algorithm) {
    case hashEnum.bcrypt:
      match = await bcrypt.compare(plainText, cipherText);
      break;
    case hashEnum.argon2:
      match = await argon2.verify(cipherText, plainText);
      break;
    default:
      throw BadRequestException({ message: "Unsupported hashing algorithm" });
  }
  return match;
};
