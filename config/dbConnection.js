import {mongoose} from "mongoose";
export const connection = async function dbConnect(){
    const uri = "mongodb+srv://bhaskar:1234@cluster0.vidhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await mongoose.connect(uri);
        console.log("connecting to mongodb")
    } catch (e) {
        console.error(e);
    } 
  }