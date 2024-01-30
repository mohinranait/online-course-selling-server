const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const { port } = require('./src/services/secretEnv');
const connectMongoDb = require('./src/services/database');
const userRoute = require('./src/routes/userRoutes');
const courseRoute = require('./src/routes/courseRoutes');
const orderRoute = require('./src/routes/orderRoutes');
const app  = express();

// Database is connect
connectMongoDb();


// Middleware
app.use(cors({
    origin: ['http://localhost:5173','https://online-course-silling-website.web.app'],
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1', userRoute)
app.use('/api/v1', courseRoute)
app.use('/api/v1', orderRoute)


// home route
app.get('/', (req, res) => {
    res.send("Home route is working")
})

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
})