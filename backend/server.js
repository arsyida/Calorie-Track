const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express');
const {client, connectDB } = require('./database');

const PORT = 5000

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ajengindar:tugasRPL@cluster0.hyvyk1j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
  } catch {
    // Ensures that the client will close when you finish/error
    console.error('Error:', error);
  }
}
runDB().catch(console.dir);


const app = express();
connectDB()
app.use(cors())
app.use(bodyParser.json())

// router
app.get("/Activity", async(req, res)=>{
    const data = await client.db('Calories').collection('Activity').find().sort({name:1}).toArray()
    res.json(data)
})

app.get("/Food", async(req, res)=>{
    const data = await client.db('Calories').collection('Food And Drink').find().sort({name:1}).toArray()
    res.json(data)
})

app.listen(PORT,()=>{
    console.log(`App run in port ${PORT}`);
})