import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config/deafult";

export interface UserInput {
    login:          string,
    email:          string,
    password:       string,
    picture:        string; // move to profile later
    stayLoggedIn:   boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt:  Date;
    updatedAt:  Date;
    comparePassword(candidatePassword: string): Promise<Boolean>; 
};

const userSchema = new mongoose.Schema({
    login:          { type: String, required: true, unique: true },
    email:          { type: String, required: true },
    password:       { type: String, required: true },
    picture:        { type: String, },
    stayLoggedIn:   { type: Boolean, default: false},
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    let user = this as UserDocument;

    if(!user.isModified('password')){
        return next()
    }
    
    const salt = await bcrypt.genSalt(config.saltWorkFactor);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function(
    candidatePassword: string
    ): Promise<boolean> {
    const user = this as UserDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("user", userSchema);

export default UserModel;

