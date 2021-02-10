const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');


router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        res.render('auth/signup', { errorMessage: 'Indicate username and password'});
        return;
    }
    //create user
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    User.create({
        username,
        password: hashPassword
    }).then(() => {
        res.redirect('/');
    }).catch(error => {
        if(error.code === 11000) {
            res.render('auth/signup', {
                errorMessage: 'Username should be unique'
            })
        }
    });

});

module.exports = router;