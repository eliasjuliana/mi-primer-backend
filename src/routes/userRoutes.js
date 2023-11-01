import express from "express";
import { getUsers, postUser } from "../controllers/userController.js";

const router = express.Router();

//GET
router.get("/", getUsers);

//POST
router.post('/', postUser)

export default router;
