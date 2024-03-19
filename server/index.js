require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

//mongo config

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@foodi-cluster.qqidon8.mongodb.net/?retryWrites=true&w=majority&appName=Foodi-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // database & collections
    const menuCollections = client.db("Foodi").collection("menus");
    const cartCollections = client.db("Foodi").collection("cartItems");

    // all menu ıtems operations
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("CONNECTED TO DB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Foodi");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
