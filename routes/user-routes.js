// Setting up the user database testing purposes - Parker
const express = require('express');
const app = express();
const db = require('../models');

// bcrypt is a node module that helps encrypt the passwords, and adds a unique id
const bcrypt = require('bcrypt');


    //returns the users list -P
    app.get('/users', async (req, res) => {
        db.User.findAll({}).then(function (users) {
            res.json(users);
        })
        
    });

    //puts the user into the list -P
    app.post('/users', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = { name: req.body.name, password: hashedPassword }
            users.push(user)
            res.status(201).send()
        } catch {
            res.status(500).send()
        }
    });

    // Checks to see if the password matches the username that is currently stored on file -P
    app.post('/users/login', async (req, res) => {
        const user = users.find(user => user.name = req.body.name)
        if (user == null) {
            return res.status(400).send('Cannot Find User Name')
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send('Success')
            } else {
                res.send('Not')
            }
        } catch {
            res.status(500).send()
        }
    })
module.exports = app;
