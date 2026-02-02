const express = require('express');
const Menu = require('../moduls/Menu');
const Person = require('../moduls/Person');
const router = express.Router();


    
router.get('/' , async(req, res) =>{
    try{
        const data = await Menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
})

router.post('/' , async (req,res) => {
    try{
        const data = req.body;
            
        const newMenu = new Menu(data);
            
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//paramaterised end point
router.get('/:taste' , async (req,res) => {
    try{
        const taste = req.params.taste; //extraction code 
        if(taste == 'Sweet' || taste == 'Sour' || taste == 'Bitter' || taste == 'Salty' || taste == 'Spicy'){
            const response = await Menu.find({taste: taste});
            console.log('data fetched');
            res.status(200).json(response);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.delete('/:id' , async (req,res) => {
    try{
        const id = req.params.id;
        const deleteMenu = await Menu.findByIdAndDelete(id)

        if (!deleteMenu) {
            return res.status(404).json({ error: 'item not found' });
        }
        console.log('item deleted');
        res.status(200).json({message: 'item deleted successfully'})
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})

module.exports = router;