import express from 'express';

import { postLogin } from '../controllers/authController.js';
import { post_loginSchema } from '../helpers/validationSchemas/loginSchemas.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();

router.post('/login', (request, response, next) => validateBody(request, response, next, post_loginSchema), postLogin);

export default router;
