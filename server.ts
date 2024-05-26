import express, { Express, Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { Schema } from "mongoose";
import UserRoutes from "./routes/UserRoutes";

const app: Express = express();
app.use(cors());

//Connecting DB - API
const pass = process.env.MONGOLAT;
const CONNECTION_STRING =
  "mongodb+srv://cequinteroar:" +
  pass +
  "@clusterlatinos.bpdn5mi.mongodb.net/LatinosMunich?retryWrites=false&w=majority&appName=ClusterLatinos";
const clientOptions: mongoose.ConnectOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };

const PORT = 3977;

//Load routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Convierte a json lo que llega por peticiones

(async function startUp() {
  try {
    await mongoose.connect(CONNECTION_STRING, clientOptions);

    const database = mongoose.connection;
    database.on("error", console.error.bind(console, "MongoDB connection error:"));
    database.once("open", () => {
      console.log("Connected to MongoDB");
    });

    app.listen(PORT, function () {
      console.log("Game planner server Up" + PORT);
    });

    //Pruebas
    app.get("/pruebas", async (req, res) => {
      res.json({ message: "Game planner server Up" });
    });

    //  Base routes
    app.use("/gameplanner", UserRoutes);
  } catch (error) {
    console.log("could not connect to MongoDB", error);
  }
})();

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client: MongoClient = new MongoClient(CONNECTION_STRING, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     app.listen(PORT, function () {
//       console.log("Game planner server Up" + PORT);
//     });

//     //Pruebas
//     app.get("/pruebas", (req, res) => {
//       res.json({ message: "Game planner server Up" });
//     });

//     //  Base routes
//     app.use("/gameplanner", UserRoutes);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
