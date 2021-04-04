import express from 'express';
import {renderToString} from 'react-dom/server';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

import {Html} from '../components/Html';
import {App} from '../components/App';

const app = express();

const csrfProtection = csurf({
  cookie: {
    sameSite: 'lax',
    key: 'csrf_secret',
  },
});

app.use(cookieParser());
app.use(express.static('built'));

app.get('/', csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  res.send(
    renderToString(<Html csrfToken={csrfToken}><App /></Html>)
  );
});

app.post('/api', csrfProtection, (_, res) => {
  res.send('ok');
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server started.'));
