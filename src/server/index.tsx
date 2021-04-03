import express from 'express';
import {renderToString} from 'react-dom/server';

import {Html} from '../components/Html';
import {App} from '../components/App';

const app = express();

app.use(express.static('built'));

app.get('/', (_, res) => {
  res.send(
    renderToString(<Html><App /></Html>)
  );
});

app.post('/api', (_, res) => {
  res.send('ok');
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server started.'));
