
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface ProfileGroupInput {
    profileGroupId:    number;
    name:           string;
    active:         boolean;
    createdBy:      UserDocument['_id'];
};

export interface ProfileGroupDocument extends ProfileGroupInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ProfileGroupSchema = new mongoose.Schema({
    profileGroupId:    { type: Number, required: true, unique: true },
    name:           { type: String, required: true },
    active:         { type: Boolean, default: false },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const ProfileGroupModel = mongoose.model<ProfileGroupDocument>("ProfileGroup", ProfileGroupSchema);

export default ProfileGroupModel;

