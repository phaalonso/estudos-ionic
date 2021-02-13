import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/uploadConfig';
import PostController from './controllers/PostController';
import UserController from './controllers/UserController';

const route = Router();
const upload = multer(uploadConfig);

route.get('/users', UserController.index);

route.get('/users/:id', UserController.show)

route.post('/users', UserController.create);

route.get('/posts', PostController.index);
route.get('/posts/:id', PostController.show);
route.post('/posts', upload.array('images') , PostController.create);

export default route;