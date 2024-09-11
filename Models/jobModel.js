import mongoose, { Schema } from "mongoose";

const jobsSchema=new Schema({
    jobId: {
        type: String,
        unique: true, // Ensure jobId is unique
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
}, { timestamps: true });


const jobsModel=mongoose.model('job',jobsSchema);

export default jobsModel;