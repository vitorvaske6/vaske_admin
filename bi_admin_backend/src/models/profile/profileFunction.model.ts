
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface ProfileFunctionInput {
    profileFunctionId: number;
    name:           string;
    active:         boolean;
    createdBy:      UserDocument['_id'];
};

export interface ProfileFunctionDocument extends ProfileFunctionInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ProfileFunctionSchema = new mongoose.Schema({
    profileFunctionId: { type: Number, required: true, unique: true },
    name:           { type: String, required: true },
    active:         { type: Boolean, default: false },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const ProfileFunctionModel = mongoose.model<ProfileFunctionDocument>("ProfileFunction", ProfileFunctionSchema);

export default ProfileFunctionModel;

