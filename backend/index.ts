import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import Team from "../models/Team";
import Game from "../models/Game"

const uri = "mongodb+srv://vartiainenakseli736:sExZD5yK0lYgYeFb@cluster0.0fflioe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const PORT =  3001;

interface CorsOptions {
  origin?: string;
  methods?: string[];
  allowHeaders?: string[];
}

app.use(cors({
  origin: "http://localhost:3000" as string,
} as CorsOptions));


mongoose.connect(uri || '')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get("/", (req: Request, res: Response) => {
  res.send("The Backend is up and running");
});

app.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
});

app.get("/api/games", async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({message: "Error fetching games", error});
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
