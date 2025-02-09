// import express from 'express';
// import mongoose from 'mongoose';
// import allRouter from './routes/index.js'
// import cors from "cors";
// const app=express();
// const PORT=3001;
// app.use(express.json());
// app.use('/api',allRouter);
// app.use(cors());


// mongoose.connect("mongodb://localhost:27017/MYTODO").then(()=>{
//     console.log("connected successfully");
// }).catch((err)=>{
//     console.log("connection failed due to",err)
// })


// app.listen(PORT,()=>{
//     console.log(`server is running on the port ${PORT}`)
// })

// app.get('/',(req,res)=>{
//     res.send("hello from the user")
// })

import express from 'express';
import mongoose from 'mongoose';
import allRouter from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', allRouter);

app.get('/', (req, res) => {
    res.send("Hello from the user");
});

// Database Connection

mongoose.connect("mongodb://localhost:27017/MYTODO").then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log("connection failed due to",err)
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
