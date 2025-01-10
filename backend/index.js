const express =require('express');
const mongoose=require('mongoose')
const cron = require('node-cron');
const bodyParser = require('body-parser');
const CyptoRoutes=require('./router/CryptoRoutes')
const cors = require('cors');
const app=express();
const port=3000;
const {Fetching}=require('./controlers/CryptoControlers')



require('dotenv').config();


const PORT = process.env.Port || 5000;
const URL='mongodb://127.0.0.1:27017/Crypto';

app.use(cors());

app.use(bodyParser.json()); 
setInterval(async () => {
    console.log('Fetching data every 10 seconds...');
    await Fetching();
}, 7200000);

app.use('/crypto', CyptoRoutes);




const start = async () => {
    await mongoose.connect(URL);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};


start();