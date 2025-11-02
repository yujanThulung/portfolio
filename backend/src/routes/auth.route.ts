import { Router } from 'express';
import userController from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  updateProfileSchema
} from '../schemas/auth.schemas';
import { authenticate, authorize } from '../middleware/auth.middleware';

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

router.post('/logout', authenticate, (req, res) => userController.logout(req, res));

router.get('/profile', authenticate,
  (req, res) => userController.getProfile(req, res)
);

router.patch('/profile', authenticate, validateBody(updateProfileSchema), (req, res) => {
  userController.updateProfile(req, res)
})



//Admin only routes
router.get('/', authenticate, authorize('admin'), (req, res) => {
  userController.getAll(req, res)
});

router.get('/:id', authenticate, authorize('admin'), (req, res) => {
  userController.getById(req, res)
});

router.patch('/:id', authenticate, authorize('admin'), validateBody(updateProfileSchema), (req, res) => {
  userController.update(req, res)
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  userController.delete(req, res)
});



router.post('/refresh-token',
  validateBody(refreshTokenSchema),
  (req, res) => userController.refreshToken(req, res)
);

export default router;