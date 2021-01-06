const express = require('express');
const User = require('../models/user');
const HouseOwner = require('../models/houseOwner');
const rentalRoutes = express.Router();

rentalRoutes.get('/houseOwnerInfo', (req, res) => {
    User.find({_id: req.cookies.userID },
     {password:0, email:0, createdAt:0, updatedAt:0, __v:0}, {limit:1}, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.render('houseOwnerInfo', { title: 'House Owner', data });
        }
    });
    
});
rentalRoutes.post('/houseOwnerInfo', (req, res) => {

    const obj = req.body;
    obj['userID'] = req.cookies.userID;
    
    const houseOwner = new HouseOwner(obj);

    houseOwner.save()
     .then(result => res.status(201).json({redirect:'/home'}))
     .catch(err => console.log(err));

});
rentalRoutes.get('/filterSearch', (req, res) => { 
    
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

        if(condition.rentRange){
            if(condition.rentRange.includes('below') || condition.rentRange.includes('above')){
                let rent;
                if(condition.rentRange.includes('below'))
                    rent = Number(condition.rentRange.replace('below', ''));
                if(condition.rentRange.includes('above'))
                    rent = Number(condition.rentRange.replace('above', ''));

                delete condition['rentRange'];
                condition['rent'] = {$lte: rent};
            }
            else{
                let rentLH = condition.rentRange.split('-');
                delete condition['rentRange'];
                let rentL = Number(rentLH[0]);
                let rentH = Number(rentLH[1]);

                condition['rent'] = {$gte: rentL, $lte: rentH};
            }
        }

        if(condition.advanceRange){
            if(condition.advanceRange.includes('below') || condition.advanceRange.includes('above')){
                let advance;
                if(condition.advanceRange.includes('below'))
                    advance = Number(condition.advanceRange.replace('below', ''));
                if(condition.advanceRange.includes('above'))
                    advance = Number(condition.advanceRange.replace('above', ''));

                delete condition['advanceRange'];
                condition['advance'] = {$lte: advance};
            }
            else{
                let advanceLH = condition.advanceRange.split('-');
                delete condition['advanceRange'];
                let advanceL = Number(advanceLH[0]);
                let advanceH = Number(advanceLH[1]);

                condition['advance'] = {$gte: advanceL, $lte: advanceH};
            }
        }
    }

    HouseOwner.find(condition, {__v:0}).sort({ createdAt: -1 })
     .exec(
        function(err, data){
            if(err){
                console.log(err);
            }
            else{
                res.render('rental/filterSearchResults', { title : 'Search Results', data });
            }
        }
     ); 

});
rentalRoutes.get('/edit', (req, res) => {

    const userID = req.cookies.userID;
    
    HouseOwner.find({userID: userID})
     .then(result => res.render('rental/edit', { title : 'Edit', result }))
     .catch(err => console.log(err));

});
rentalRoutes.get('/editPost/:id', async (req, res) => {

    const postID = req.params.id;

    HouseOwner.findOne({_id: postID}, {__v:0})
     .then(data => res.render('rental/editPost', { title : 'Edit post', data, postID }))
     .catch(err => res.redirect('/home'));
         
});
rentalRoutes.put('/update/:id', (req, res) => {

    const postID = req.params.id;
    const obj = req.body;

    HouseOwner.findByIdAndUpdate({_id:postID}, obj, {useFindAndModify: false}, function(err, docs){
        if(err) console.log(err);
        else res.status(201).json({redirect: '/rental/edit'});
    });
});

rentalRoutes.delete('/delete/:id', (req, res) => {

    const postID = req.params.id;

    HouseOwner.deleteOne({_id:postID}, function(err, doc){
        if(err) console.log(err);
        else res.status(201).json({redirect: '/rental/edit'});
    });
    
});

rentalRoutes.get('/viewAll', async (req, res) => {
    let states = [];
    let cities = [];
    let areas = [];
    let pins = [];

    const houseOwners = await HouseOwner.find({}).sort({createdAt:-1});

    const promises = houseOwners.map(async obj => {
        const houseOwner = await obj;
        return houseOwner;
    });

    const data = await Promise.all(promises);

    data.forEach(obj => {
        states.push(obj.state);
        cities.push(obj.city);
        areas.push(obj.area);
        pins.push(obj.pin);
    });

    states = Array.from(new Set(states));
    cities = Array.from(new Set(cities));
    areas = Array.from(new Set(areas));
    pins = Array.from(new Set(pins));

    res.render('rental/viewAll', { title : 'View All', data, states, cities, areas, pins });

});

module.exports = rentalRoutes;