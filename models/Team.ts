import mongoose, { Schema, Document } from "mongoose";

interface IScore {
    made_points: number,
    let_points: number
};

interface ITeam extends Document {
    name: string,
    city: string,
    wins: number,
    losses: number,
    scores: IScore,
    link: string
};

const ScoreSchema: Schema = new Schema({
    made_points: { type: Number, required: true },
    let_points: { type: Number, required: true }
})

const TeamSchema: Schema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    scores: { type: [ScoreSchema], required: true },
    link: {type: String, required: true}
});

const Team = mongoose.model<ITeam>("Team", TeamSchema);

export default Team