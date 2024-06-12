const express = require('express')
const cors = require("cors")



const routes = require("./routes")

const app = express()
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(routes)
app.use(cors)

const PORT = 3333
app.listen(PORT, () => console.log(`Server is runing on Port ${PORT}`)
)