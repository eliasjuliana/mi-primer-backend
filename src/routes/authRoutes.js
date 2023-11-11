import express from 'express';

import { postLogin } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();

router.post('/login', (request, response, next) => validateBody(request, response, next, ), postLogin);

export default router;
