
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface CompanyTypeInput {
    companyTypeId:  number;
    name:           string;
    active:         boolean;
    createdBy:      UserDocument['_id'];
};

export interface CompanyTypeDocument extends CompanyTypeInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const CompanyTypeSchema = new mongoose.Schema({
    companyTypeId:  { type: Number, required: true, unique: true },
    name:           { type: String, required: true },
    active:         { type: Boolean, default: false },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const CompanyTypeModel = mongoose.model<CompanyTypeDocument>("CompanyType", CompanyTypeSchema);

export default CompanyTypeModel;

