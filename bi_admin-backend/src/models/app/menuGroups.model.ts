
import mongoose from "mongoose";
import { PageDocument } from "./page.model";
import { ReportDocument } from "../report/report.model";
import { UserDocument } from "../user.model";

export interface MenuGroupsInput {
    groupTitle: string;
    links:      string[]; // Page or Report
    createdBy:  UserDocument['_id'];
};

export interface MenuGroupsDocument extends MenuGroupsInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const MenuGroupsSchema = new mongoose.Schema({
    groupTitle: { type: String, required: true },
    links:      { type: [ mongoose.Schema.Types.ObjectId ], required: true, ref: 'page or report' },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const MenuGroupsModel = mongoose.model<MenuGroupsDocument>("MenuGroups", MenuGroupsSchema);

export default MenuGroupsModel;

