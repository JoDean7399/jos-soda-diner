const express = require('express');
const router = express.Router();
const DinerModel = require('../models/diner.model');
//this creates a diner
router.post('/createDiner',(req,res)=>{
    const createdDiner = new DinerModel(req.body);
    createdDiner.save().then((results,err)=>{
        
        if(err){
            console.log(`Server error ${err}`);
            res.send(`Server error ${err}`)
        }else{
            DinerModel.find()
            .then((results,err)=>{
                console.log(results);
                
                if(err){
                    res.send(`Server error ${err}`);
                }else{
                    res.send({message: `Thanks for your creation`, diner: results, type:'diner'});
                };  
            });
          
        };
    });
});
//this finds the diners or lets them know there are none giving the option to add some if they choose
router.get('/dinerInfo', (req,res)=>{
    DinerModel.find()
    .then((results,err)=>{
        if(err){
            res.send(`Server error ${err}`);
        }else{
            if(results.length === 0){
                res.send({message: 'There are no diners listed at this time!! Feel free to add some.', type:'diner'});
            }else{
                res.send({diner: results, type: 'diner'});
            };
        };  
    });
});
//this deletes a diner from the database
router.delete('/:id',(req,res)=>{
    DinerModel.deleteOne({_id:req.params.id})
    .then((results,err)=>{
        if(err){
            res.send(`Server error ${err}`);
        }else{
            res.send({message: 'Your diner was deleted', type: 'diner'});
        };    
    });
});
//this updates diner information
router.put('/:id', (req,res)=>{
    DinerModel.updateOne()
    .then((results,err)=>{
        if(err){
            res.send(`Server error ${err}`);
        }else{
            res.send({message: 'Your diner information was updated', type: 'diner'});
        };
    });
});
module.exports = router;