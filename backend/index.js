import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; //used if we want to use cross domain
import mongoose from 'mongoose';

import env from 'dotenv';
env.config();
const port = process.env.PORT || 3001;

// Importing user route
import user from './routes/User.js';
import parcel from './routes/Parcel.js';
import forgotPassword from './routes/ForgotPassword.js';
import qrcode from './routes/QRouter.js';

const app = express()
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to DB!");
})


app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Adding a Router
app.use("/user", user);
app.use("/parcel", parcel);
app.use("/forgot-password", forgotPassword);
app.use("/qrcode", qrcode);
app.get("/", (req, res) => {
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})