import express from 'express'
import { createData } from '../controllers/userController.js';

const route = express.Router();

route.post('/create', createData);

export default route;