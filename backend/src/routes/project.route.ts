import {Router} from 'express';
import ProjectController  from '../controllers/project.controller';
import {validateRequest} from '../middleware/validation.middleware';
import {createProjectSchema} from '../schemas/project.schemas';
import Project from '../models/project.model';

const router = Router();

router.get('/slug/:slug', ProjectController.getBySlug);


//admin only routes
router.post('/',validateRequest(createProjectSchema),ProjectController.create);

export default router; 