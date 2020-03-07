const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // convert JSON file
require('dotenv/config');


app.use(cors());
app.use(bodyParser.json());



//Import Routes
const postsRoute = require('./routes/posts');

//Middleware
app.use('/api/posts', postsRoute);



//Routes
app.get('/',(req, res) => {
    res.send('we are home');
});



// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useUnifiedTopology: true }, () => console.log('Connected to DB')
    );


app.listen(3000);