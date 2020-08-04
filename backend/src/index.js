import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes.auth);
app.use('/api/groups', routes.groups);

app.listen(process.env.PORT, () => (
  console.log(`App listening on port ${process.env.PORT} !`)
));

