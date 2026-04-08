import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.connect.js";
import { errorHandler } from "./middleware/global.error.handler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working");
});

app.use("/api", routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    dbConnect();
    app.listen(PORT, async () => {
      console.log("Server running on port ", PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();