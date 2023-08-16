import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { router } from './router';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use(express.json());

app.get('/', (req, res) => res.json({ success: true }));

app.use(router);

app.use(errorHandler);

app.listen(3000, () => console.log(`listening on port 3000`));
