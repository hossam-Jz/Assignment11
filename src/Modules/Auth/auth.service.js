import { findOne, create, findById } from "../../DB/DB.repository.js";
import { userModel } from "../../DB/Models/user.model.js";
import { hashEnum } from "../../Utils/enums/security.enum.js";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../../Utils/respones/err.respones.js";
import { successResponses } from "../../Utils/respones/success.respones.js";
import { encrypt } from "../../Utils/security/encryption.security.js";
import {
  compareHash,
  generateHash,
} from "../../Utils/security/security.hash.js";
import { getNewLoginCredentials } from "../../Utils/token/token.js";
import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config.service.js";
import { providerEnum } from "../../Utils/enums/user.enum.js";

export const signup = async (req, res) => {
  const { userName, email, password, gender, phone } = req.body;
  const Existuser = await findOne({
    model: userModel,
    filter: { email },
  });
  if (Existuser) ConflictException({ message: " email already exist" });
  const hashPassword = await generateHash({
    plainText: password,
    saltRound: 10,
    algorithm: hashEnum.bcrypt,
  });

  const encryptPhone = await encrypt(phone);

  const user = await create({
    model: userModel,
    data: {
      userName,
      email,
      password: hashPassword,
      gender,
      phone: encryptPhone,
    },
  });

  return successResponses({
    res,
    message: "user Signup successfuly",
    data: user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findOne({
    model: userModel,
    filter: { email },
  });
  if (!user) throw NotFoundException({ message: "user not found" });

  const isMatch = compareHash({
    plainText: password,
    cipherText: user.password,
    algorithm: hashEnum.bcrypt,
  });

  if (!isMatch) throw NotFoundException({ message: "invalid password" });

  const token = await getNewLoginCredentials(user);

  return successResponses({
    res,
    message: "user login successfuly",
    data: { token },
  });
};

async function verifyGoogleAccont({ idToken }) {
  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return payload;
}

export const loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;
  const { email, email_verified, given_name, family_name, picture } =
    await verifyGoogleAccont({ idToken });

  if (!email_verified) BadRequestException({ message: "Email not verified" });

  const user = await findOne({ model: userModel, filter: { email } });

  if (user) {
    console.log("Google email:", email);
    console.log("User from DB:", user);
    if (user.provider !== providerEnum.GOOGLE)
      ConflictException({
        message: "Email already exists with another provider",
      });

    const credentials = await getNewLoginCredentials(user);

    return successResponses({
      res,
      massage: "login successfully",
      statusCode: 200,
      data: { credentials },
    });
  }
  const newUser = await create({
    model: userModel,
    data: {
      firstName: given_name,
      lastName: family_name,
      email,
      profilePic: picture,
      provider: providerEnum.GOOGLE,
    },
  });
};
