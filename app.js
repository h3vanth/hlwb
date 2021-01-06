const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const HouseOwner = require('./models/houseOwner');
const LandOwner = require('./models/landOwner');
const Bookmark = require('./models/bookmark');;

const { auth } = require('./controllers/auth');

const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const landRoutes = require('./routes/landRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');


const dbURI = process.env.DB_URI;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(result => app.listen(process.env.PORT || 8080))
 .catch(err => console.log(err));

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/rental', auth, rentalRoutes);
app.use('/land', auth, landRoutes);
app.use('/bookmarks', auth, bookmarkRoutes);

app.get('/home', async (req, res) => { 

    let states = [];
    let cities = [];
    let areas = [];
    let pins = [];
    let states1 = [];
    let cities1 = [];
    let areas1 = [];
    let pins1 = [];
    let sqFt = [];
    let prices = [];

    const houseOwners = await HouseOwner.find({}).sort({createdAt:-1});
    const landOwners = await LandOwner.find({}).sort({createdAt:-1});

    const promises = houseOwners.map(async obj => {
        const houseOwner = await obj;
        return houseOwner;
    });

    const promises1 = landOwners.map(async obj => {
        const landOwner = await obj;
        return landOwner;
    });

    const data = await Promise.all(promises);
    const data1 = await Promise.all(promises1);

    data.forEach(obj => {
        states.push(obj.state);
        cities.push(obj.city);
        areas.push(obj.area);
        pins.push(obj.pin);
    });
    
    data1.forEach(obj => {
        states1.push(obj.state);
        cities1.push(obj.city);
        areas1.push(obj.area);
        pins1.push(obj.pin);
        sqFt.push(obj.sqFt);
        prices.push(obj.price)
    });

    states = Array.from(new Set(states));
    cities = Array.from(new Set(cities));
    areas = Array.from(new Set(areas));
    pins = Array.from(new Set(pins));

    states1 = Array.from(new Set(states1));
    cities1 = Array.from(new Set(cities1));
    areas1 = Array.from(new Set(areas1));
    pins1 = Array.from(new Set(pins1));
    sqFt = Array.from(new Set(sqFt));
    prices = Array.from(new Set(prices));

    res.render('home', { title : 'Home', data, states, cities, areas, pins,
    data1, states1, cities1, areas1, pins1, sqFt, prices });

});

app.get('/details/:id', auth, async (req, res) => {
    
    const id = req.params.id;
    const userID = req.cookies.userID;
    const houseOwner = await HouseOwner.findOne({_id:id});
    const landOwner = await LandOwner.findOne({_id:id});
    let H_L;

    if(houseOwner){
        H_L = 'H';
        const bookmark = await Bookmark.findOne({postID:id, userID});
        let bookmarked = false;

        if(bookmark) bookmarked = true;

        HouseOwner.find({_id: id}, { __v:0}, {limit:1}, 
            function(err, data){
                if(err){
                    res.redirect('/home');
                }
                else{
                    res.render('details', { title : 'Details', data, id, bookmarked, H_L });
                }
        });
        
    }
    else if(landOwner){
        H_L = 'L';
        const bookmark = await Bookmark.findOne({postID1:id, userID});
        let bookmarked = false;

        if(bookmark) bookmarked = true;

        LandOwner.find({_id: id}, { __v:0}, {limit:1}, 
            function(err, data){
                if(err){
                    res.redirect('/home');
                }
                else{
                    res.render('details', { title : 'Details', data, id, bookmarked, H_L });
                }
        });
    }
    else res.redirect('/home');  
      
});


app.get('/logout', auth, (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('userID', '', { maxAge: 1 });
    res.redirect('/login');
});

app.use((req, res) => {
    res.redirect('/home');
});