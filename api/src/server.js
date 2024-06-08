const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
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

startServer().then(r => console.log("Server started successfully", r));
