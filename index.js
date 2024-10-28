const express = require('express');
//const mongoose = require('mongoose'); 
const redis =require('redis');
const {Client} =require('pg');

// init app
const port = process.env.port || 4000;
const app = express();


// // connect db
// const db_user = 'root';
// const db_pass = 'example';
// const db_port = '27017';
// const db_ip = 'mongo';

// const connectionStr = `mongodb://${db_user}:${db_pass}@${db_ip}:${db_port}`; 

  
// mongoose.connect(connectionStr)
// .then(()=> console.log("connect to db"))
// .catch(()=> console.log("failed to connect"));


const db_user = 'root';
const db_pass = 'example';
const db_port = '5432';
const db_ip = 'postgres';

const uri = `postgressql://${db_user}:${db_pass}@${db_ip}:${db_port}`; 

const client = new Client({
    connectionString:uri,
  })
   
  client.connect()
.then(()=> console.log("connect to db"))
.catch(()=> console.log("failed to connect"));



// redis

const r_port = '6379';
const r_ip = 'redis';

const redisClient = redis.createClient({
    url: `redis://${r_ip}:${r_port}`
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', err => console.log('Redis Client connect'));
redisClient.connect();


///////////////////

app.get('/', (req, res) => {
    redisClient.set('products','products');
    res.send('<h1>Hello TestImage! hi hi dev</h1>');
});

app.get('/data ',async (req, res) => {
    const products =await redisClient.get('products');
    res.send(`<h1>Hello TestImage! hi hi dev</h1> <h2> ${products} </h2>`);
});

app.listen(port, () => console.log(`App is up and running on port: ${port}`));
