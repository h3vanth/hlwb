const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {maxAge, createToken} = require('../controllers/token');
const User = require('../models/user');
const loginRoutes = express.Router();

loginRoutes.use(cookieParser());

loginRoutes.get('/', (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('/login');
            }
            else{
                res.redirect('/home');
            }
        });
    }
    else{
        res.render('login', { title : 'Login', error: '' });
    }
    
});

loginRoutes.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    if(user){
        const token = createToken(user._id);
        res.cookie('userID', user._id, { maxAge: maxAge*1000 });
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(201).json({ redirect : '/home' });
    }
    else{
        res.status(401).json({ error: 'Enter valid credentials' });
    }

});

module.exports = loginRoutes;