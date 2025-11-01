import { Router } from 'express';
import userController from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';
import { 
  registerSchema, 
  loginSchema, 
  refreshTokenSchema 
} from '../schemas/auth.schemas';

const router = Router();

// POST /api/users/register
router.post('/register', 
  validateBody(registerSchema), 
  (req, res) => userController.register(req, res)
);

router.post('/login', 
  validateBody(loginSchema), 
  (req, res) => userController.login(req, res)
);

router.post('/refresh-token', 
  validateBody(refreshTokenSchema), 
  (req, res) => userController.refreshToken(req, res)
);

export default router;