import { Router } from 'express';
import passport from 'passport';
import { register, login, authStatus, logout, setup2FA, verify2FA, reset2FA } from '../controllers/auth.controller.ts';

const router = Router();

// test route
router.get("/test", async (req, res) => {
    return res.json({"hello": "there"});
})

// registration route
router.post("/register", register);
 
// login route
router.post("/login", passport.authenticate("local"), login);
 
// auth-status route
router.get("/status", authStatus);
 
// logout route
router.post("/logout", logout);
 
// 2fa setup
router.post("/2fa/setup", setup2FA);

// verify route
router.post("/2fa/verify", verify2FA);

// reset route
router.post("/2fa/reset", reset2FA);
 
export default router;