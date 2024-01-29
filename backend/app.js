const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const allRoutes = require("./Routes/allRoutes");
const cookieParser = require("cookie-parser");
const cors = require('cors');


// Database here 
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Error while connecting", error);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser);
app.use(cors());


//route
app.use("/notesApp",allRoutes);


// test route  
app.get("/", (req, res) => {
  res.json({
    message: "Backend is ready to rock",
  });
});


//listening port
app.listen(process.env.PORT, () => {
  console.log("connect to Server");
});
