import { Router } from "express";
import * as authService from "./auth.service.js";
const router = Router();

router.post("/signup", authService.signup);
router.post("/login", authService.login);
router.post("/social-login",authService.loginWithGoogle);
// http://localhost:3000/api/auth/social-login
// CLIENT_ID= "630278810563-ps657pa2jll22s3bsq4o9elkbt1up7s1.apps.googleusercontent.com"
export default router;
 