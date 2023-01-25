const express = require('express');
const createToken = require('./Utils');

const app = express();
app.use(express.json());

const validationName = async (request, response) => {
const { name } = request.body;
if (!name) {
  return response.status(400).json({ message: 'O campo "name" é obrigatório' });
}
if (name.length < 3) { 
  return response.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
 }
 return response.status(200).json({ token: createToken() });
};

const validationAge = async (request, response) => {
  const { age } = request.body;
   if (!age) {
      return response.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age.length < 18) { 
      return response.status(400)
      .json({ message: ' A pessoa palestrante deve ser maior de idade' });
    }
  
   return response.status(200).json({ token: createToken() });
  };
  
  const validationTalk = async (request, response) => {
    const { talk } = request.body;
     if (!talk) {
        return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
      }
    const { watchedAt, rate } = talk;
    if (!watchedAt) {
      return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!rate) {
      return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }

   return response.status(200).json({ token: createToken() });
      };

module.exports = {
    validationName,
    validationAge,
    validationTalk,
};