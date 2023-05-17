import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from "cors"
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

//for deployment path 
import path from path;


// env config
dotenv.config();    

//* database config
connectDB();    

//create express app
const app = express();

/* MIDDLEWARE*/
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
//for deployment 
app.use(express.static(path.join(__dirname,'./client/build')));

//* ROUTES  
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//REST API
app.get('/', (req, res) => {    
    res.send("<h1>Welcome to Ecommerce App</h1>");
});
//for deployment 
app.use("*",function(req,res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

// Setup server port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT} on ${process.env.DEV_MODE}`.bgCyan.white);
})