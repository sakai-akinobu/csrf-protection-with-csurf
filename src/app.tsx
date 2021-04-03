import express from 'express';
import {renderToString} from 'react-dom/server';

const app = express();

app.get('/', (_, res) => {
  res.send(renderToString(<div>Hello World</div>));
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server started.'));
