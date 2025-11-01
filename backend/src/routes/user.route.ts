import { Router } from 'express';
import userController from '../controllers/user.controller'; // ensure file name is correct

const router = Router();

console.log("✅ User routes loaded");

// POST /api/users/register
router.post('/register', (req, res) => userController.register(req, res));

// Optional: test route
router.get('/test', (req, res) => {
    res.json({ message: "User routes work ✅" });
});

export default router;
