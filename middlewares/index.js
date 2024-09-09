import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/blog.js"
const app = express();

const connectToMongo = async () => {
    const res = await mongoose.connect("mongodb://localhost:27017/blog-mern-project");
    if(res) {
        console.log("Connected to MongoDB");
    }
};

connectToMongo();
app.use(cors());

app.use(express.json());
app.use(express.static("public/upload"));

app.get("/", (req, res) => {
    res.send("API is running");
});

// API ROUTES
app.use("/api/v1", authRoutes);

app.listen(5000, () => {
    console.log("server is running on the PORT of 5000");
});