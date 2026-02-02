const express = require('express');
const app = express();
const db = require('./db'); // just import to initialize DB connection

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //req.body



app.get('/', (req,res) =>{
    res.send('welcome to our hotel')
});
    


    
    
//Importing the router file(person routes)
const personRouter = require('./routes/personRoutes')
app.use('/person' , personRouter) //using the route
    
 //Importing the router file(menu router)
 const menuRoutes = require('./routes/menuRoutes') 
 app.use('/menu' , menuRoutes)


app.listen(3000, () => {
    console.log('Server running on port 3000');
});


