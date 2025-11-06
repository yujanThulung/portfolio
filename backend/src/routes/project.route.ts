import {Router} from 'express';
import ProjectController  from '../controllers/project.controller';
import Project from '../models/project.model';

const router = Router();

router.get('/slug/:slug', ProjectController.getBySlug);

export default router; 