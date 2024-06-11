const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = process.env.PORT;

const app = express();
app.use(cors())
app.use(bodyParser.json())

const uri = process.env.URL_DB;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
      try {
          await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
    } catch (error) {
        console.error('Error:', error);
    }
}
connectDB();

// router
app.get("/Activity", async(req, res)=>{
    const data = await client.db('calories').collection('Activity').find().sort({name:1}).toArray()
    res.json(data)
})

app.get("/Food", async(req, res)=>{
    const data = await client.db('calories').collection('Food And Drink').find().sort({name:1}).toArray()
    res.json(data)
})

app.listen(PORT,()=>{
    console.log(`App run in port ${PORT}`);
})
