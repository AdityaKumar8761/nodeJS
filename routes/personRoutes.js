const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Person = require('../moduls/Person');


router.post('/' , async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data
        
        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new person to the databse
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



router.get('/' , async(req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json({data})
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server Error"});
    }
})



//parametiresd end point
router.get('/:workType' , async (req,res) => {
    try{
        const workType = req.params.workType;  //Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/:id' , async (req,res) => {
    try{
        const id = req.params.id;  //extract the id
        const updatedData = req.body;  //extract the new data

        const response = await Person.findByIdAndUpdate(id , updatedData ,{
            new: true,  //Return the updated document
            runValidators: true // check all the mongoose validatiors
        })
        
        if(!response){
            return res.status(404).json({error: 'person data not found'});
        }
        console.log('data updated');
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})



module.exports = router;