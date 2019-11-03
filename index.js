const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'usersdb',
    password: 'pass123'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected');
});

const app = express();
app.use(bodyParser.json());

// Create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE usersdb';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created');
    });
});

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), email VARCHAR(255) UNIQUE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Users table created');
    });
});

// Insert user
app.get('/adduser', (req, res) => {
    let user = {
        fname: 'Naomi',
        lname: 'Watts',
        email: 'naomi.watts@gmail.com'
    };

    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User added successfully');
    });
});

app.post('/adduser', (req, res) => {
    let user = req.body;
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    })
});

// Get all users
app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
});

// Get specific user
app.get('/getuser/:id', (req, res) => {
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

// Update user
app.get('/updateuser/:id', (req, res) => {
    let newName = 'Naomi';
    let sql = `UPDATE users SET fname = '${newName}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.post('/updateuser/:id', (req, res) => {
    let body = req.body;
    let sql = `UPDATE users SET fname = ?, lname = ?, email = ? WHERE id = ${req.params.id}`;
    db.query(sql, [body['fname'], body['lname'], body['email']], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

// Delete user
app.get('/deleteuser/:id', (req, res) => {
    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.listen('3000', () => console.log('Server started on port 3000'));
