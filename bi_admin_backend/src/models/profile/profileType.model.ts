
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface ProfileTypeInput {
    profileTypeId: number;
    name:       string;
    active:     boolean;
    createdBy:  UserDocument['_id'];
};

export interface ProfileTypeDocument extends ProfileTypeInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ProfileTypeSchema = new mongoose.Schema({
    profileTypeId:     { type: Number, required: true, unique: true },
    name:           { type: String, required: true },
    active:         { type: Boolean, default: false },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const ProfileTypeModel = mongoose.model<ProfileTypeDocument>("ProfileType", ProfileTypeSchema);

export default ProfileTypeModel;

