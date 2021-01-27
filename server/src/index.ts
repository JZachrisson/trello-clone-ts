import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

const PORT: string | number = process.env.PORT || 8080;

let lists: any[] = [];

app.post('/save', (req, res) => {
  console.log(req.body);
  lists = req.body.lists;
  return res.json({ success: true });
});

app.get('/load', (req, res) => res.json({ lists }));

app.listen(PORT, () =>
  console.log(`Trello backend running on http://localhost:${PORT}!`)
);
