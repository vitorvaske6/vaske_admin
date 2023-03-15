
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface ProfileInput {
    name:               string;
    surname:            string;
    active:             boolean;
    profileFunction:    string;
    profileGroups:      string[];
    profileType:        string;
    profileReports:     string[];
    profileUsers:       string[];
    profileAppMenus:    string[];
    profileAppPages:    string[];
    createdBy:          UserDocument['_id'];
};

export interface ProfileDocument extends ProfileInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ProfileSchema = new mongoose.Schema({
    name:               { type: String, required: true },
    surname:            { type: String, required: true },
    active:             { type: Boolean, default: false },
    profileFunction:    { type: String },
    profileGroups:      { type: [String] },
    profileType:        { type: String, required: true },
    profileReports:     { type: [String] },
    profileUsers:       { type: [String] },
    profileAppMenus:    { type: [String] },
    profileAppPages:    { type: [String] },
    createdBy:          { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});

const ProfileModel = mongoose.model<ProfileDocument>("Profile", ProfileSchema);

export default ProfileModel;

