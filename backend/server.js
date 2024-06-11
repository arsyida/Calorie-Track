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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error){
    // Ensures that the client will close when you finish/error
    console.error('Error:', error);
  }
}
runDB();

// router
app.get("/Activity", async(req, res)=>{
    const data = await client.db('calories').collection('Activity').find().sort({name:1}).toArray()
    res.json(data)
})

app.get("/Food", async(req, res)=>{
    const data = await client.db('caalories').collection('Food And Drink').find().sort({name:1}).toArray()
    res.json(data)
})

app.listen(PORT,()=>{
    console.log(`App run in port ${PORT}`);
})
