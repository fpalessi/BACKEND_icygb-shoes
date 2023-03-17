import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/database.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import cookieParser from "cookie-parser";

// app
const app = express();

// env files
dotenv.config();

// db
dbConnect();

// back🤝front
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

// allow json
app.use(express.json());

// parse cookies
app.use(cookieParser());

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running @ ${process.env.PORT}`);
});
