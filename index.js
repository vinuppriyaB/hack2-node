import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

// import { movieRouter } from "./routes/movie.js";
import { userRouter } from "./routes/user.js";
import { questionRouter } from "./routes/question.js";


dotenv.config();



const app = express();
const PORT = process.env.PORT || 8900;
const MONGO_URL = process.env.MONGO_URL;
// mongodb+srv://vinuppriya:<password>@cluster0.xu3bs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(express.json());
app.use(cors());

export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb connected");
  
  return client;
}

export const client = await createConnection();



app.get("/", (request, response) => {
   response.send("hai")
});


// app.use("/movies",movieRouter);
app.use("/question",questionRouter);
app.use("/user",userRouter);
// app.get("/question", (request, response) => {
//   response.send("hai");
// });

app.listen(PORT, () => console.log("the server is started in", PORT));
