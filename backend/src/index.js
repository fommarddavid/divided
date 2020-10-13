// import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import routes from './routes';

const port = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', routes.auth);
app.use('/password', routes.password);
app.use('/groups', routes.groups);

app.listen(port, function () {
  console.log(`Express server listening on port ${port}`)
})

