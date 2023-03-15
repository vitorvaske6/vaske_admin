
import mongoose from "mongoose";
import { MenuGroupsDocument } from "./menuGroups.model";
import { UserDocument } from "../user.model";

export interface MenuInput {
    title:          string;
    groupEnabled:   boolean;
    groups:         MenuGroupsDocument['_id'][];
    createdBy:      UserDocument['_id'];
};

export interface MenuDocument extends MenuInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const MenuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    groupEnabled: { type: Boolean, required: true },
    groups: { type: [ mongoose.Schema.Types.ObjectId ], required: true },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const MenuModel = mongoose.model<MenuDocument>("Menu", MenuSchema);

export default MenuModel;

