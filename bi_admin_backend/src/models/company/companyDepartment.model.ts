
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface CompanyDepartmentInput {
    companyDepartmentId:    number;
    name:                   string;
    active:                 boolean;
    departmentReports:      string[];
    createdBy:              UserDocument['_id'];
};

export interface CompanyDepartmentDocument extends CompanyDepartmentInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const CompanyDepartmentSchema = new mongoose.Schema({
    companyDepartmentId:    { type: Number, required: true, unique: true },
    name:                   { type: String, required: true },
    active:                 { type: Boolean, default: false },
    departmentReports:      [String],
    createdBy:              { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, {
    timestamps: true
});

const CompanyDepartmentModel = mongoose.model<CompanyDepartmentDocument>("CompanyDepartment", CompanyDepartmentSchema);

export default CompanyDepartmentModel;

