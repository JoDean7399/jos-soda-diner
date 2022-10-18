const express = require('express');
const router = express.Router();
let SodaModel = require('../models/soda.model');

//this adds the users soda to the database
router.post('/rateSoda',(req,res)=>{
    const addedSoda = new SodaModel(req.body);
    addedSoda.save().then((results,err)=>{
        if(err){
            console.log(`Server error ${err}`);
            res.send(`Server error ${err}`);
        }else{
            SodaModel.find()
            .then((results,err)=>{
                if(err){
                    res.send(`Server error ${err}`)
                }else{
                    res.send({message: `Thank you, your soda has been added`,soda: results, type: 'soda'});
                };
            });
        
        };    
    });
});
//this finds the sodas or lets them know there are none giving the option to add some if they choose
router.get('/sodaInfo', (req,res)=>{
    SodaModel.find()
    .then((results,err)=>{
        if(err){
            res.send(`Server error ${err}`)
        }else{
            if (results.length === 0) {
                res.send({message: "There are no sodas at this time!! Feel Free to add some.", type: 'soda'})
            }else {
                res.send({soda: results, type: "soda"});
            };
        };
    });
});
//this deletes a soda from the database
router.delete('/:id',(req,res)=>{
    SodaModel.deleteOne({_id:req.params.id})
    .then((results,err)=>{
        if(err){
            res.send(`Server error ${err}`);
        }else{
            res.send({message: 'Your soda was deleted',  type: 'soda'});
        };
    });
});
//this updates soda information
router.put('/:id', (req,res)=>{
    SodaModel.updateOne()
    .then((results,err)=>{
        if(err){
            res.send(`Server error ${err}`);
        }else{
            res.send({message: 'Your soda information was updated', type: 'diner'});
        };
    });
})
module.exports = router;


