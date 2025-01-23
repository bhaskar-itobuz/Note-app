import express from 'express'
import { createData, verifyData } from '../controllers/userController.js';
import { checkLogin } from '../loginCheck/loginCheck.js'

const route = express.Router();

route.post('/create', createData);
route.get('/verify/:token',verifyData);
route.post('/check',checkLogin);

export default route;