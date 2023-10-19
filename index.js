const express = require('express');
const cors = require('cors');
const { connect } = require('mongo');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware for server 
app.use(express.json());
app.use(cors());

// mongo db connect
// brand-admin
// pmEZiotlVv4Sy5be
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.fycfdwn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const prodactCollection = client.db('prodactDB').collection("prodact");

    app.get("/prodact", async (req, res) => {
      const cursor = prodactCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get("/prodact/:name", async (req, res) => {
      const brandName = prodactCollection.find({ brand: req.params.name });
      const result = await brandName.toArray()
      res.send(result)
})
    app.post("/prodact", async (req, res) => {
      const coffee = req.body;
      const result = await prodactCollection.insertOne(coffee);
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send('server side is running properly')
})

app.listen(port, () => {
  console.log('server runnnig at port :' ,port);
})