const express = require('express');

const server = express();

server.use(express.json());// para o servidor conseguir ler o formato JSON.

//localhost:3000/teste
// query params = ?teste=1
// route params = /users/1
// request body = { "name": "Jéssica", "email": "jessica@gmail.com" }

//CRUD - Created, Read, Update, Delete

const users = ['Diego', 'Claudio',' Jéssica'];

server.use((req, res, next) => { // middleware global.
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
});

server.get('/users', (req,res) => {
    return res.json(users); //essa rota retorna todos os usuários.
})

server.get('/users/:index', (req, res) => { 
    const { index } = req.params;

    return res.json(users[index]); 
})

server.post('/users', (req,res) => { //criar novos usuários.
    const { name } = req.body; //busca a propriedade name de dentro do corpo da requisição.

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', (req, res) => { //fazendo aleração.
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
});

server.listen(3000);