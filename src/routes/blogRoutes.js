import express from 'express';

import {
  deleteBlog,
  getBlog,
  getBlogs,
  postBlog,
  putBlog,
} from '../controllers/blogController.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

import {
  post_blogSchema,
  put_blogSchema,
} from '../helpers/validationSchemas/blogSchemas.js';

const router = express.Router();

// GET
router.get('/', getBlogs);
router.get('/:id', getBlog);

// POST
router.post(
  '/',
  isAuthenticated,
  isAdmin,
  (request, response, next) => validateBody(request, response, next, post_blogSchema),
  postBlog,
);

// PUT
router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (request, response, next) => validateBody(request, response, next, put_blogSchema),
  putBlog,
);

// DELETE
router.delete('/:id', isAuthenticated, isAdmin, deleteBlog);

export default router;
