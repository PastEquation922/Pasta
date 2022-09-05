import mongoose, { model, Schema } from 'mongoose';


export const logChannelSchema = model(
    "log-channels",
    new mongoose.Schema({
        Guild: String,
        Channel: String
    })
)