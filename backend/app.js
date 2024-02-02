const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const allRoutes = require("./Routes/allRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//socket code
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);
//socket code



// Database here
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Error while connecting", error));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

//route
app.use("/api/notesApp", allRoutes);

// test route
app.get("/", (req, res) => {
  res.json({
    message:"backend rocks",
  })
});

//socket io 
io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

  socket.on('client-message',(data)=>{
    socket.broadcast.emit("server-message",data);
  })


 
});





//listening port
server.listen(process.env.PORT, () => {
  console.log("connect to Server");
});
