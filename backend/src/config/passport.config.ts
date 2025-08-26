import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { User } from '../models/user.model.ts';

passport.use(
    new LocalStrategy(async function(username, password, done) {
        try {
            const user = await User.findOne({ username }).select('+password');
            if(!user) return done(null, false, {message: "User not found"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) return done(null, user);
            else return done(null, false, {message: "Invalid Credentials"});

        } catch(error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log("inside serializer");
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        console.log('inside deserializer');

        const user = await User.findById(_id).select('-password +twoFactorSecret');
        if(user) done(null, user);
        else done(null, false);         // user not found
    } catch(error) {    
        done(error);
    }
})