import express from 'express'
import { createData, verifyData } from '../controllers/userController.js';

const route = express.Router();

route.post('/create', createData);
route.get('/verify/:token',verifyData)

export default route;