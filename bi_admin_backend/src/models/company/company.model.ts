
import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface CompanyInput {
    cnpjCpf:            string;
    corporateName:      string;
    fantasyName:        string;
    active:             boolean;
    companyDepartments: string[];
    companyType:        string;
    companyGroup:       string;
    companyProfiles:    string[];
    createdBy:          UserDocument['_id'];
};

export interface CompanyDocument extends CompanyInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const CompanySchema = new mongoose.Schema({
    cnpjCpf:            { type: String, required: true },
    corporateName:      { type: String, required: true },
    fantasyName:        { type: String },
    active:             { type: Boolean, default: false },
    companyDepartments: { type: [String] },
    companyType:        { type: String, required: true },
    companyGroup:       { type: String },
    companyProfiles:    { type: [String] },
    createdBy:          { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});

const CompanyModel = mongoose.model<CompanyDocument>("Company", CompanySchema);

export default CompanyModel;

