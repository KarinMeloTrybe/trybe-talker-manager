const express = require('express');
const { getData } = require('./helpers/talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkersData = await getData();
  response.status(HTTP_OK_STATUS).json(talkersData);
});

app.listen(PORT, () => {
  console.log('Online');
});
