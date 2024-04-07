require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

//mongo config

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@foodi-cluster.qqidon8.mongodb.net/Foodi?retryWrites=true&w=majority&appName=Foodi-cluster`;

mongoose
  .connect(uri)
  .then(() => console.log("Connected To DB!!!"))
  .catch((err) => console.log(err));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// verify jwt token

//import routes
const menuRoutes = require("./api/routes/MenuRoutes");
const cartRoutes = require("./api/routes/CartRoutes");
const userRoutes = require("./api/routes/UserRoutes");
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Foodi");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
