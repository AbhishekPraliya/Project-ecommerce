import express from "express"

import authRoutes from "./src/routes/auth.route.js"
import userRoutes from "./src/routes/user.route.js"
import sellerRoutes from "./src/routes/seller.route.js"
import ownerRoutes from "./src/routes/owner.route.js"
import emailRoleRoutes from './src/routes/emailRole.route.js'
import productRoutes from "./src/routes/product.route.js"
import webRoutes from "./src/routes/web.route.js"
import contactUsRoutes from './src/routes/contactUs.route.js';
import categoryRoutes from './src/routes/category.route.js'

import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import { app,server } from "./lib/socket.js"
import path from "path"

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// app.use(express.json());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb", extended:true}));

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth", authRoutes )
app.use("/api/owner", ownerRoutes )
app.use("/api/user", userRoutes )
app.use("/api/seller", sellerRoutes )

app.use("/api/product", productRoutes )
app.use("/api/web", webRoutes )
app.use("/api/email-roles", emailRoleRoutes )
app.use('/api/contact-us', contactUsRoutes);
app.use('/api/category', categoryRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}


server.listen(PORT,()=>{
    console.log("Hello Abhishek, Server is running on port:"+PORT);
    connectDB();
})
