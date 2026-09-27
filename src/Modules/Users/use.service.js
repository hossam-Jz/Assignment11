import { decrypt } from "../../Utils/security/encryption.security.js";
import { successResponses } from "../../Utils/respones/success.respones.js";

export const getprofile = async (req, res) => {
  const { user } = req;

  if (user.phone) user.phone = decrypt(user.phone);

  return successResponses({
    res,
    message: " Welcome",
    stausCode: 200,
    data: user,
  });
};
