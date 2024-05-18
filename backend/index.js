require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const portNumber = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
console.log(process.env.MONGO_URI);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => console.log("connected to MongoDB"));

const petRoute = require("./routes/petRoute");
app.use("/api/v1/pets", petRoute);

app.listen(portNumber, () => {
  console.log(`server is running on http://localhost:${portNumber}`);
});
