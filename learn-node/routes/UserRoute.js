import express from "express";
import { getUser, getUserById, createUser, updateUser, deleteUser, Register, Login, logout } from "../controller/UserController.js";
import { VerifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";
const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', logout);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;