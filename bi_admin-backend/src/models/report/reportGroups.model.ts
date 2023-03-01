
import mongoose from "mongoose";
import { ReportDocument } from "./report.model";
import { UserDocument } from "../user.model";

export interface ReportGroupsInput {
    groupTitle: string;
    links:      ReportDocument['_id'][];
    createdBy:  UserDocument['_id'];
};

export interface ReportGroupsDocument extends ReportGroupsInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ReportGroupsSchema = new mongoose.Schema({
    groupTitle: { type: String, required: true },
    links:      { type: [ mongoose.Schema.Types.ObjectId ], required: true, ref: 'report' },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const ReportGroupsModel = mongoose.model<ReportGroupsDocument>("ReportGroups", ReportGroupsSchema);

export default ReportGroupsModel;

