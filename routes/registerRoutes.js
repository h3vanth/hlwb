const express = require('express');
const cookieParser = require('cookie-parser');
const {maxAge, createToken} = require('../controllers/token');
const User = require('../models/user');
const registerRoutes = express.Router();

registerRoutes.use(cookieParser());

registerRoutes.get('/', (req, res) => {
    res.render('register', { title : 'Register' });
});

registerRoutes.post('/', (req, res) => {
    const user = new User(req.body);

    user.save()
     .then(result => {
        const token = createToken(result._id);
        res.cookie('userID', result._id, { maxAge: maxAge*1000 });
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(201).json({redirect:'/home'});            
     })
     .catch(err => res.status(401).json({error:'User with given mail id already exists!'}));

});

module.exports = registerRoutes;