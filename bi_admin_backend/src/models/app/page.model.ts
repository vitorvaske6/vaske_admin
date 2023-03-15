
import mongoose from "mongoose";
import { MenuGroupsDocument } from "./menuGroups.model";
import { UserDocument } from "../user.model";

export interface PageInput {
    name:       string;
    page:       string;
    createdBy:  UserDocument['_id'];
};

export interface PageDocument extends PageInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const PageSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    page:       { type: String, required: true },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const PageModel = mongoose.model<PageDocument>("Page", PageSchema);

export default PageModel;

