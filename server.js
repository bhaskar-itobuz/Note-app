import express from "express";
import {mongoose} from "mongoose";
import routes from '../backend/routes/userRoute.js'
import bodyParser from 'body-parser';

const app = express();
const port = 3000 
app.use(bodyParser.json());
app.use(express.json())
app.use("/note", routes)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

async function dbConnect(){
  const uri = "mongodb+srv://bhaskar:1234@cluster0.vidhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
      await mongoose.connect(uri);
      console.log("connecting to mongodb")
  } catch (e) {
      console.error(e);
  } 
}
dbConnect()