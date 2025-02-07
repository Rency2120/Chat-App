import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserProfile, getUsersForSidebar } from '../controller/userController.js';

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/userProfile", protectRoute, getUserProfile);

export default router