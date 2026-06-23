import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update_profile", protectRoute, updateProfile);

router.get("/check_protected", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

// router.get("/check", protectRoute, (req, res) => {
//   res.status(200).json(req.user);
// });
export default router;
