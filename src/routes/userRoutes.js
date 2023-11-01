import express from "express";
import { deleteUser, getUsers, postUser, putUser } from "../controllers/userController.js";

const router = express.Router();

//GET
router.get("/", getUsers);

//POST
router.post('/', postUser);

//PUT
router.put('/:id', putUser);

//DELETE
router.delete('/:id', deleteUser);

export default router;
