import express from "express";
import routes from '../backend/routes/userRoute.js'
import bodyParser from 'body-parser';
import {connection} from '../backend/config/dbConnection.js'

const app = express();
const port = 3000 
app.use(bodyParser.json());
app.use(express.json())
app.use("/note", routes)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

connection()