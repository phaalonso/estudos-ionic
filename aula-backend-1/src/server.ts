import express from 'express';
import 'express-async-errors';
import route from './routes';
import path from 'path';

import './database/connection';

import errorHandler from './errors/handler';

const app = express();

app.use(express.json());


app.use(route);

app.use('/uploads', express.static(path.join(__dirname, '..', 'static', 'images')));
app.use(errorHandler);

app.listen(3333);