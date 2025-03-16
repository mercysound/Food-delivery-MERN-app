import mongoose from "mongoose";

export const connectDb = async () =>{
  await mongoose.connect('mongodb+srv://adekunleadewolemercy:Aa.03942020@cluster0.qtifuwo.mongodb.net/food-del')
.then(()=>console.log("DB Connected"))
}