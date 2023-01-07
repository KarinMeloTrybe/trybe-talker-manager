const express = require('express');
const { getData } = require('./helpers/talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FIND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkersData = await getData();
  response.status(HTTP_OK_STATUS).json(talkersData);
});

app.get('/talker/:id', async (request, response) => {
  const talker = await getData();
  const { id } = request.params;
  const talkerId = talker.find((person) => Number(id) === Number(person.id));
  if (!talkerId) {
 return response.status(HTTP_NOT_FIND_STATUS).json({
   message: 'Pessoa palestrante não encontrada' });
} 
return response.status(HTTP_OK_STATUS).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
