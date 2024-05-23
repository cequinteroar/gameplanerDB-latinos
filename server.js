var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(cors());

//Connecting DB - API
var mongoose = require("mongoose");
const pass = process.env.MONGOLAT;
const CONNECTION_STRING =
  "mongodb+srv://cequinteroar:" +
  pass +
  "@clusterlatinos.bpdn5mi.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLatinos";
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };

const DATABASE = "LatinosMunich";
const PORT = 3977;

//Load routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Convierte a json lo que llega por peticiones

//Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(CONNECTION_STRING, clientOptions);

const database = mongoose.connection;
database.on("error", console.error.bind(console, "MongoDB connection error:"));
database.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, function () {
  console.log("Game planner server Up" + PORT);
});

//Pruebas
app.get("/pruebas", (req, res) => {
  res.json({ message: "Game planner server Up" });
});
