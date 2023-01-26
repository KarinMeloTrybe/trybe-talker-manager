const express = require('express');

const app = express();
app.use(express.json());

const validationName = async (request, response, next) => {
const { name } = request.body;
if (!name) {
  return response.status(400).json({ message: 'O campo "name" é obrigatório' });
}
if (name.length < 3) { 
  return response.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
 }
 next();
};

const validationAge = async (request, response, next) => {
  const { age } = request.body;
   if (!age) {
      return response.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) { 
      return response.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    if (!Number.isInteger(age)) { 
      return response.status(400)
      .json({ message: 'A idade deve ser um número inteiro' });
    }
   next();
  };
  
  const validationTalk = async (request, response, next) => {
    const { talk } = request.body;
     if (!talk) {
        return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
      }
      next();
    };

    const validationWatchedAt = async (request, response, next) => {
      const { talk } = request.body;
      const { watchedAt } = talk;
    const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i;
    if (!watchedAt) {
      return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (regex.test(watchedAt) === false) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };

    const validationRate = async (request, response, next) => {
      const { talk } = request.body;
      const { rate } = talk;  
      if (rate === undefined) {
      return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if ((rate < 1 || rate > 5) || !Number.isInteger(rate)) {
   return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
   next();
      };

      const validationToken = async (request, response, next) => {
          const { authorization } = request.headers;
          if (!authorization) {
            return response.status(401).json({ message: 'Token não encontrado' });
          }
          if (authorization.length !== 16) {
            return response.status(401).json({ message: 'Token inválido' });
          }
          next();
          };

module.exports = {
    validationName,
    validationAge,
    validationTalk,
    validationWatchedAt,
    validationRate,
    validationToken,
};