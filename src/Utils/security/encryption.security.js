import crypto from "node:crypto";
import { ENC_KEY } from "../../config/config.service.js";
import { Buffer } from "node:buffer";
const ENCRYPTION_SECRET_KEY = Buffer.from(ENC_KEY);
const iv_length = 16;

export const encrypt = (text) => {
  const iv = crypto.randomBytes(iv_length);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    ENCRYPTION_SECRET_KEY,
    iv,
  );
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = (encryptedData) => {
  const [ivHex, encryptionText] = encryptedData.split(":") || [];

  const ivLikeBinary = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_SECRET_KEY,
    ivLikeBinary
  );
  let decryptedData = decipher.update(encryptionText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
};
