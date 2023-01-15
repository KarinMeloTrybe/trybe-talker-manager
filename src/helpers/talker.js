const path = require('path');
const fs = require('fs').promises;

const resolve = path.resolve(__dirname, '..', 'talker.json');

const getData = async () => {
    try {
 const data = await fs.readFile(resolve, 'utf8');
 const object = JSON.parse(data);
return object;   
} catch (error) {
console.error(`Erro: ${error}`);
    }
};

module.exports = {
    getData,
};
