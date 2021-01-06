const express = require('express');
const Bookmark = require('../models/bookmark');
const HouseOwner = require('../models/houseOwner');
const LandOwner = require('../models/landOwner');
const bookmarkRoutes = express.Router();

bookmarkRoutes.post('/bookmark', async (req, res) => {

    const userID = req.cookies.userID;
    const { postID, H_L } = req.body;

    const user = await Bookmark.findOne({userID});

    if(user){
        const _id = user._id;

        if(H_L === 'H'){
            Bookmark.findByIdAndUpdate({_id}, {$push:{postID}}, {useFindAndModify:false}, function(err, doc){
                if(err){
                    console.log(err);
                }
                else{
                    res.status(201).json({status:'success'});
                }
            });
        }
        else{
            Bookmark.findByIdAndUpdate({_id}, {$push:{postID1:postID}}, {useFindAndModify:false}, function(err, doc){
                if(err){
                    console.log(err);
                }
                else{
                    res.status(201).json({status:'success'});
                }
            });
        }
        
    }
    else{
        if(H_L === 'H'){
            const bookmark = new Bookmark({ userID, postID });
    
            bookmark.save()
            .then(result => res.status(201).json({status:'success'}))
            .catch(err => console.log(err));
        }
        else{
            const bookmark = new Bookmark({ userID, postID1 });
    
            bookmark.save()
            .then(result => res.status(201).json({status:'success'}))
            .catch(err => console.log(err));
        }
    }
});

bookmarkRoutes.delete('/bookmark', async (req, res) => {
    const userID = req.cookies.userID;
    const { postID, H_L } = req.body;
    const bookmark = await Bookmark.findOne({ userID });

    if(H_L === 'H'){
        Bookmark.findByIdAndUpdate({_id: bookmark._id}, {$pull: {postID}}, {useFindAndModify:false}, function(err, doc){
            if(err) console.log(err);
            else res.status(201).json({status:'success'});
        });
    }
    else{
        Bookmark.findByIdAndUpdate({_id: bookmark._id}, {$pull: {postID1:postID}}, {useFindAndModify:false}, function(err, doc){
            if(err) console.log(err);
            else res.status(201).json({status:'success'});
        });
    }
});  

bookmarkRoutes.get('/', async (req, res) => {
    const userID = req.cookies.userID;
    const bookmark = await Bookmark.findOne({ userID });

    if(bookmark){
        const postIDs = bookmark.postID;
        const postIDs1 = bookmark.postID1;
   
        const promises = postIDs.map(async e => {
            const post = await HouseOwner.findOne({_id:e});
            return post;
        });

        const promises1 = postIDs1.map(async e => {
            const post = await LandOwner.findOne({_id:e});
            return post;
        });

        const data = await Promise.all(promises);
        const data1 = await Promise.all(promises1);

        for(let i=0; i<data.length || i<data1.length; i++){
            if(data[i]==null && i<data.length)
                data.splice(i,1);
            if(data1[i]==null && i<data1.length)
                data1.splice(i,1);
        }
        // console.log(data, data1);
        if(data.length!==0 && data1.length!==0){
            // console.log(1);
            res.render('bookmarks', { title : 'Bookmarks', data, data1 });
        }  
        else if(data.length!==0){
            // console.log(2);
            res.render('bookmarks', { title : 'Bookmarks', data, data1 : [] });
        }
        else{
            // console.log(3);
            res.render('bookmarks', { title : 'Bookmarks', data1, data : [] });
        }
    }
    else res.render('bookmarks', { title : 'Bookmarks', data : [], data1 : [] });
    
});

module.exports = bookmarkRoutes;
