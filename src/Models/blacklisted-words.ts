import mongoose, { model, Schema } from 'mongoose';


export const wordChannelSchema = model(
    "blacklisted-words",
    new mongoose.Schema({
        Guild: String,
        Blacklist: Array
    })
)