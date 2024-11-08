const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes');
require("dotenv/config")

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://meetingeworking.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());
app.use(routes);

const PORT = 3333;

async function startServer() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
        app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

startServer().then(() => console.log("Server started successfully"));

