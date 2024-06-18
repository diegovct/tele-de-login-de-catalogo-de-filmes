
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));


db.serialize(() => {
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela de usuários:', err);
        } else {
            console.log('Tabela de usuários criada com sucesso');
        }
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Tentativa de login:', email, password);

    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            res.status(500).json({ success: false, message: 'Erro ao acessar o banco de dados.' });
        } else if (row) {
            res.json({ success: true, message: 'Login efetuado com sucesso!' });
        } else {
            res.json({ success: false, message: 'Email ou senha incorretos.' });
        }
    });
});


app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log('Tentativa de registro:', email, password);

    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function(err) {
        if (err) {
            console.error('Erro no banco de dados:', err);
            res.status(500).json({ success: false, message: 'Erro ao registrar usuário. Email já cadastrado?' });
        } else {
            res.json({ success: true, message: 'Registro efetuado com sucesso!' });
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
