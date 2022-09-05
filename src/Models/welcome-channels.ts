import mongoose, { model, Schema } from 'mongoose';


export const welcomeChannelSchema = model(
    "welcome-channels",
    new mongoose.Schema({
        Guild: String,
        Channel: String
    })
)