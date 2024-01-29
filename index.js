const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const { port } = require('./src/services/secretEnv');
const connectMongoDb = require('./src/services/database');
const app  = express();

// Database is connect
connectMongoDb();


// Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())


// home route
app.get('/', (req, res) => {
    res.send("Home route is working")
})

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
})