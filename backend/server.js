const express = require("express");
const app = express();
require("dotenv").config();
require("./db/connection");

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const port = 5000;

app.use(bodyParser.json());

const userRegister = require("./Routes/userRoute");
const blogRoute = require("./Routes/blogRoute");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRegister);
app.use("/api", blogRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
