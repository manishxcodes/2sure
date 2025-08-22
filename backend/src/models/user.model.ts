import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

export interface UserType extends Document {
    username: string,
    password: string,
    isMfaActive: boolean,
    twoFactorSecret: string,
}

const userSchema: Schema = new Schema<UserType>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isMfaActive: {
        type: Boolean,
        required: false,
        default: false,
    },
    twoFactorSecret: {
        type: String,
        select: false,
    }
}, {timestamps: true});

userSchema.pre<UserType>("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

export const User = mongoose.model<UserType>('User', userSchema);