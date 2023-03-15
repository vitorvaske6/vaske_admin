
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface ReportInput {
    name:           string;
    menuTitle:      string;
    description:    string;
    active:         boolean;
    reportId:       string;
    workspace:      string;
    createdBy:      UserDocument['_id'];
};

export interface ReportDocument extends ReportInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ReportSchema = new mongoose.Schema({
    name:           { type: String, required: true },
    menuTitle:      { type: String, required: true },
    description:    { type: String },
    active:         { type: Boolean, default: false },
    reportId:       { type: String, required: true, unique: true },
    workspace:      { type: String, required: true },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const ReportModel = mongoose.model<ReportDocument>("Report", ReportSchema);

export default ReportModel;

