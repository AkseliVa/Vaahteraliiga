import mongoose, { Schema, Document } from "mongoose";

interface Game extends Document {
    home_team: string,
    away_team: string,
    home_score: number,
    away_score: number,
    week: string
};

const GameSchema: Schema = new Schema({
    home_team: { type: String, required: true },
    away_team: { type: String, required: true },
    home_score: { type: Number, required: true },
    away_score: { type: Number, required: true },
    week: { type: String, required: true }
});

const Game = mongoose.model<Game>("Game", GameSchema);

export default Game