import jobsModel from "../Models/jobModel.js";
import { v4 as uuidv4 } from "uuid";

// Create a new job posting
export const postJob = async (req, res) => {
    const { jobTitle, jobDescription, salary, location, company } = req.body;
    if (!jobTitle || !jobDescription || !salary || !location || !company) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const jobId = uuidv4();
        const newJob = new jobsModel({
            jobId,
            jobTitle,
            jobDescription,
            salary,
            location,
            company
        });
        await newJob.save(); 
        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        res.status(500).json({ message: "Failed to create job", error: error.message });
    }
};

// Get all job postings
export const getJobs = async (req, res) => {
    try {
        const jobs = await jobsModel.find();  
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve jobs", error: error.message });
    }
};

// Edit an existing job posting by ID
export const editJob = async (req, res) => {
    try {
        const jobId = req.params.jobId; 
        console.log('jobId+++',jobId)
        const { jobTitle, jobDescription, salary, location, company } = req.body;
        const updatedJob = await jobsModel.findOneAndUpdate( { jobId: jobId } , { jobTitle, jobDescription, salary, location, company },  
        { new: true, runValidators: true });  
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: "Failed to update job", error: error.message });
    }
};

export const partialEditJob = async (req, res) => {
    try {
        const jobId = req.params.jobId; 
        console.log('jobId+++',jobId)


        const { jobTitle, jobDescription, salary, location, company } = req.body;

        const updateFields = {};
        if (jobTitle) updateFields.jobTitle = jobTitle;
        if (jobDescription) updateFields.jobDescription = jobDescription;
        if (salary) updateFields.salary = salary;
        if (location) updateFields.location = location;
        if (company) updateFields.company = company;

        const updatedJob = await jobsModel.findOneAndUpdate( { jobId: jobId } , { $set:updateFields },  
        { new: true, runValidators: true });  
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: "Failed to update job", error: error.message });
    }
};

// Delete a job posting by ID
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId; 
        const deletedJob = await jobsModel.findOneAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete job", error: error.message });
    }
};
