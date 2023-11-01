//mongoose

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI).then(()=>{
    console.log('DB conectada');
}).catch((e)=>{
    console.error(e);
});