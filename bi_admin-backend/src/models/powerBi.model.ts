
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface PowerBiInput {
    workspace: string;
    reportId: string;

};

export interface PowerBiDocument extends PowerBiInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const PowerBiSchema = new mongoose.Schema({
    workspace:  { type: String, required: true },
    reportId:   { type: String, required: true },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const PowerBiModel = mongoose.model<PowerBiDocument>("Report", PowerBiSchema);

export default PowerBiModel;

