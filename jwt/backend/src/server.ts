import express from 'express';
import * as dotenv from 'dotenv';

import routes from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT as number,  () => console.log(`Listening on all interfaces:${PORT}`));


