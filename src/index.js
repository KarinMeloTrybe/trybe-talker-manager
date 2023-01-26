const express = require('express');
const path = require('path');
const { writeFile, readFile } = require('fs').promises;
const { getData } = require('./helpers/talker');
const createToken = require('./helpers/Utils');
const { validationName, validationAge, validationTalk,
 validationWatchedAt, validationRate, validationToken } = require('./helpers/middlewares');

const app = express();
app.use(express.json());

const personsPath = path.resolve(__dirname, 'talker.json');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FIND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search?q=searchTerm', validationToken, async (request, response) => {
  try {
    const { searchTerm } = request.params;
    const { id } = request.params;
    const promise = await readFile(personsPath.searchTerm); // ou includes? ou personsPath === personsPath.params ?
    const persons = JSON.parse(promise);
    const { name, age, talk } = { ...request.body };
    const { watchedAt, rate } = talk;
    const searchedPerson = { 
      id,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    return response.status(200).json(searchedPerson);
   } catch (err) { response.status(200).json({ talker }); }
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

app.post('/talker',
validationToken, validationName, validationAge, validationTalk, validationWatchedAt, validationRate,
async (request, response) => {
  try {
    const promise = await readFile(personsPath);
    const persons = JSON.parse(promise);
    const { name, age, talk } = { ...request.body };
    const { watchedAt, rate } = talk;
    const newPerson = { 
      id: persons[persons.length - 1].id + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    const talkers = JSON.stringify([...persons, newPerson]);
    await writeFile(personsPath, talkers);
    return response.status(201).json(newPerson);
    } catch (err) { response.status(401).send(err); }
});

app.put('/talker/:id', 
  validationToken, 
  validationName, validationAge, validationTalk, validationWatchedAt, validationRate,
 async (request, response) => {
  try {
 const { id } = request.params;
 const { name, age, talk } = request.body;
 const promise = await readFile(personsPath);
 const talkers = JSON.parse(promise);
 const index = talkers.findIndex((persons) => persons.id === Number(id));
 talkers[index] = { id: Number(id), name, age, talk };
 const updatedTalkers = JSON.stringify([...talkers, index]);
 await writeFile(personsPath, updatedTalkers);
 return response.status(200).json(talkers[index]);
 } catch (err) {
   response.status(400).send({ message: err.message }); 
 }
});

app.delete('/talker/:id', validationToken, async (request, response) => {
  const { id } = request.params;
  const promise = await readFile(personsPath);
  const talkers = JSON.parse(promise);
  const filterPersons = talkers.filter((persons) => persons.id !== Number(id));
  const updatedTalkers = JSON.stringify(filterPersons);
  await writeFile(personsPath, updatedTalkers);
  return response.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
