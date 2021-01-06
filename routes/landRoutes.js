const express = require('express');
const User = require('../models/user');
const LandOwner = require('../models/landOwner');
const landRoutes = express.Router();

landRoutes.get('/landOwnerInfo', (req, res) => {
    
    User.find({_id: req.cookies.userID },
        {password:0, email:0, createdAt:0, updatedAt:0, __v:0}, {limit:1}, function(err, data){
           if(err){
               console.log(err);
           }
           else{
               res.render('landOwnerInfo', { title: 'Land Owner', data });
           }
       });
});
landRoutes.post('/landOwnerInfo', (req, res) => {

    const obj = req.body;
    obj['userID'] = req.cookies.userID;
    
    const landOwner = new LandOwner(obj);

    landOwner.save()
     .then(result => res.status(201).json({redirect:'/home'}))
     .catch(err => console.log(err));

});
landRoutes.get('/filterSearch', (req, res) => { 
    
    const url = req.url;

    const data = url.replace('/filterSearch?', '');
    let noOfValues = 1;
    let keyValuePairs = [];
    let keyValuePairsWithoutSign;
    let keys = [];
    let values = [];
    let condition = {};

    if(data !== ''){

        for(let i=0; i<data.length; i++){
            if(data[i]==='&') noOfValues++;
        }
        
        if(noOfValues>1){
            keyValuePairs = data.split('&');
            keyValuePairs.forEach(field => {
                keyValuePairsWithoutSign = field.split('=');
                keys.push(keyValuePairsWithoutSign[0]);
                values.push(keyValuePairsWithoutSign[1]);
            });
        }
        else{
            keyValuePairsWithoutSign = data.split('=');
            keys.push(keyValuePairsWithoutSign[0]);
            values.push(keyValuePairsWithoutSign[1]);
        }
        
        for(let i=0; i<noOfValues; i++){
            condition[keys[i]] = values[i]; 
        }
    }

    LandOwner.find(condition, {__v:0}).sort({ createdAt: -1 })
     .exec(
        function(err, data){
            if(err){
                console.log(err);
            }
            else{
                res.render('land/filterSearchResults', { title : 'Search Results', data });
            }
        }
     ); 

});
landRoutes.get('/edit', (req, res) => {

    const userID = req.cookies.userID;
    
    LandOwner.find({userID: userID})
     .then(result => res.render('land/edit', { title : 'Edit', result }))
     .catch(err => console.log(err));

});

landRoutes.get('/editPost/:id', async (req, res) => {

    const postID = req.params.id;
    
    LandOwner.findOne({_id: postID}, {__v:0})
     .then(data => res.render('land/editPost', { title : 'Edit post', data, postID }))
     .catch(err => res.redirect('/home'));
         
});
landRoutes.put('/update/:id', (req, res) => {

    const postID = req.params.id;
    const obj = req.body;

    LandOwner.findByIdAndUpdate({_id:postID}, obj, {useFindAndModify: false}, function(err, docs){
        if(err) console.log(err);
        else res.status(201).json({redirect: '/land/edit'});
    });
});

landRoutes.delete('/delete/:id', (req, res) => {

    const postID = req.params.id;

    LandOwner.deleteOne({_id:postID}, function(err, doc){
        if(err) console.log(err);
        else res.status(201).json({redirect: '/land/edit'});
    });
    
});

landRoutes.get('/viewAll', async (req, res) => {
    let states = [];
    let cities = [];
    let areas = [];
    let pins = [];
    let sqFt = [];
    let prices = [];

    const landOwners = await LandOwner.find({}).sort({createdAt:-1});

    const promises = landOwners.map(async obj => {
        const landOwner = await obj;
        return landOwner;
    });

    const data = await Promise.all(promises);

    data.forEach(obj => {
        states.push(obj.state);
        cities.push(obj.city);
        areas.push(obj.area);
        pins.push(obj.pin);
        sqFt.push(obj.sqFt);
        prices.push(obj.price);
    });

    states = Array.from(new Set(states));
    cities = Array.from(new Set(cities));
    areas = Array.from(new Set(areas));
    pins = Array.from(new Set(pins));
    sqFt = Array.from(new Set(sqFt));
    prices = Array.from(new Set(prices));

    res.render('land/viewAll', { title : 'View All', data, states, cities, areas, pins, sqFt, prices });
});

module.exports = landRoutes;