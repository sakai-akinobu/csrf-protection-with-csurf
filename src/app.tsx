import express from 'express';
import {renderToString} from 'react-dom/server';

import {App} from './components/App';

const app = express();

app.get('/', (_, res) => {
  res.send(renderToString(<App />));
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server started.'));
