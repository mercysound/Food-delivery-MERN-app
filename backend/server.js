import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";



//app config 
const app = express();
const port = 4000;

// middleware
app.use(express.json())
app.use(cors());
// app.use(cors({
//   origin: 'https://food-delivery-mern-app-git-main-adekunles-projects-4c114af5.vercel.app',
//   credentials: true
// }));

// db connection
connectDb();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter);

app.get("/", (req, res)=>{
  res.send("API working")
})

app.listen(port, ()=>{
  console.log(`Server started on http://localhost:${port}`);
  
})
// mongodb+srv://adekunleadewolemercy:<db_password>@cluster0.qtifuwo.mongodb.net/