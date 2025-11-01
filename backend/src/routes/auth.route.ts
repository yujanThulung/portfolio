import { Router } from 'express';
import userController from '../controllers/auth.controller'; // ensure file name is correct

const router = Router();

// POST /api/users/register
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));

router.post('/refresh-token', (req, res) => userController.refreshToken(req, res));




export default router;
