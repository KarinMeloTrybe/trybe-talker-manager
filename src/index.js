const express = require('express');
const { getData } = require('./helpers/talker');
const createToken = require('./helpers/Utils');

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

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
if (!email) {
  return response.status(400).json({ message: 'O campo "email" é obrigatório' });
}
 if (regex.test(email) === false) {
  return response.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' });
 }
if (!password) {
  return response.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 6) { 
  return response.status(400)
  .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
 }
 return response.status(200).json({ token: createToken() });
});

app.post('/talker', (req, response) => {
  const person = { ...req.body };

  response.status(201).json({ person });
});

app.listen(PORT, () => {
  console.log('Online');
});
