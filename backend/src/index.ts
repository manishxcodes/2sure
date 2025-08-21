import express, { urlencoded } from 'express';
import session from 'express-session';
import dotnev from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import { connectToDB } from './config/db.ts';

dotnev.config();

const app = express();

// middleware
const corsOptions = {
    origin: ["http://localhost:3001"],
    credentials: true               // to supports cookies/ sessions/ headers
}
app.use(cors(corsOptions));
app.use(express.json({ limit: "100md" }));
app.use(urlencoded({ limit: "100md", extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET || "SECRET-SESSION-skfafajhfjalkfjaoifh",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        // httpOnly: true,         // JS can’t read cookie (prevents XSS)
        // secure: true,           // send only over HTTPS (set true in prod)
        // sameSite: "lax"         // helps protect against CSRF
    }
}))
app.use(passport.initialize());
app.use(passport.session());

// routes

// listen app
const PORT = process.env.PORT || 7002;

connectToDB()
.then(() => {
    app.on("error", (error) => {
        console.log("\nError while listening: \n", { details: error });
    });

    app.listen(PORT, () => {
        console.log(`\nlistening on port ${PORT}`);
    })
})
.catch((error) => {
    console.log("\nMongo DB connection failed \n", {details: error},);
})


