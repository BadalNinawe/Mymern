import {Router } from 'express';
import todoRoute from './todoRoute.js';
const router=Router();
router.use('/todo',todoRoute);
export default router;