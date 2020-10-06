import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes.auth);
app.use('/api/password', routes.password);
app.use('/api/groups', routes.groups);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

