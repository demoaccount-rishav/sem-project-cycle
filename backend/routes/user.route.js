import express from 'express';
import { createUser, deleteUser, findUser, updateUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/createuser', createUser);
userRouter.get('/finduser', findUser);
userRouter.put('/updateuser/:id', updateUser);
userRouter.delete('/deleteuser/:id', deleteUser);

//add route for fetching all users
export default userRouter;