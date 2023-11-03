import express from 'express';
import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { post_userSchema, put_userSchema } from '../helpers/validationSchemas/userSchemas.js';

const router = express.Router();

// GET
router.get('/', getUsers);

// POST
router.post(
  '/',
  (request, response, next) => validateBody(request, response, next, post_userSchema),
  postUser,
);

// PUT
router.put('/:id', (request, response, next) => validateBody(request, response, next, put_userSchema), putUser);

// DELETE
router.delete('/:id', deleteUser);

export default router;
