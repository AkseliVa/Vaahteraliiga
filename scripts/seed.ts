import mongoose from "mongoose";
import Team from "../models/Team";
import Game from "../models/Game";

const uri = "mongodb+srv://vartiainenakseli736:sExZD5yK0lYgYeFb@cluster0.0fflioe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const teams = [
    { 
        name: "Roosters", 
        city: "Helsinki", 
        wins: 4, 
        losses: 0,
        scores: [{made_points: 182, let_points: 26}] ,
        link: "https://www.helsinkiroosters.com/"
    },
    { 
        name: "Steelers", 
        city: "Kuopio", 
        wins: 3, 
        losses: 0, 
        scores: [{made_points: 129, let_points: 27}],
        link: "https://steelers.fi/"
    },
    { 
        name: "Crocodiles",
        city: "Seinäjoki",
        wins: 4,
        losses: 0, 
        scores: [{made_points: 166, let_points: 85}],
        link: "https://crocodiles.fi/"
    },
    { 
        name: "Crusaders",
        city: "Lohja", 
        wins: 0, 
        losses: 3,
        scores: [{made_points: 62, let_points: 234}],
        link: "https://www.unc.fi/"
    },
    { 
        name: "Butchers", 
        city: "Porvoo", 
        wins: 1, 
        losses: 3, 
        scores: [{made_points: 126, let_points: 96}],
        link: "https://www.porvoonbutchers.com/"
    },
    { 
        name: "Royals", 
        city: "Vaasa", 
        wins:0, 
        losses: 3, 
        scores: [{made_points: 39, let_points: 110}],
        link: "https://royals.fi/"
    },
    { 
        name: "Wolverines", 
        city: "Helsinki",
        wins: 0,
        losses: 3,
        scores: [{made_points: 20, let_points: 146}],
        link: "https://helsinkiwolverines.com/"
    },
];

const games = [{
    home_team: "Roosters",
    away_team: "Royals",
    home_score: 28,
    away_score: 12
}]

mongoose.connect(uri || "")
    .then(async () => {
    console.log("MongoDB connected");

    await Team.deleteMany({});
    await Team.insertMany(teams);

    await Game.deleteMany({});
    await Game.insertMany(games);

    console.log("Team data has been added");
    console.log("Game data has been added")
    mongoose.connection.close();
}).catch(err => console.error("Could not connect to MongoDB", err));