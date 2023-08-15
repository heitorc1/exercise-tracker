import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { router } from './router';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.get('/', (req, res) => res.json({ success: true }));

app.use(router);

app.listen(3000, () => console.log(`listening on port 3000`));
