import mongoose from "mongoose";
import { UserDocument } from "../user.model";

export interface C4mInput {
    user:           UserDocument['_id'];
    function:       string;
    url:            string;
    method:         string;
    consumerKey:    string;
    consumerSecret: string;
};

export interface C4mDocument extends C4mInput, mongoose.Document {
    createdAt:      Date;
};

const C4mSchema = new mongoose.Schema({
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    function:       { type: String, required: true },
    url:            { type: String, required: false },
    method:         { type: String, required: true },
    consumerKey:    { type: String, required: true },
    consumerSecret: { type: String, required: false },

}, {
    timestamps: true
});

const C4mModel = mongoose.model<C4mDocument>("C4m", C4mSchema);

export default C4mModel;