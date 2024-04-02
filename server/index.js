require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

    // all cart item operations

    // posting cart to db
    app.post("/cart", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });

    // get carts using email
    app.get("/cart", async (req, res) => {
      const email = req.query.email;
      const filter = {
        email,
      };
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    });

    // get a spesific item
    app.get("/cart/:id", async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.findOne(filter);
      res.send(result);
    });

    // delete items from cart
    app.delete("/cart/:id", async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    });

    // update carts quantity
    app.put("/cart/:id", async (req, res) => {
      const { id } = req.params;
      const { quantity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10),
        },
      };

      const result = await cartCollections.updateOne(
        filter,
        updateDoc,
        options
      );
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
