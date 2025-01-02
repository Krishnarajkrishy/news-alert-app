const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { createDbConnection } = require("./DB");
const Router = require("./routes/News");
require("dotenv").config();

createDbConnection();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/news", Router); 

app.listen(3000, "localhost", () => {
  console.log("server is started");
});
