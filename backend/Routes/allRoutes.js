const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const notesRoute = require('./notesRoute');

router.get("/user",userRoute);
router.get("/notes",notesRoute);



module.exports = router;