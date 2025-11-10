import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// User applies to a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({ message: "Job id is required.", success: false });
        }

        // Check if user already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job.", success: false });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        // Create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({ message: "Job applied successfully.", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};

// Get all applied jobs for a user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: { path: 'company' }
            });

        return res.status(200).json({ 
            applications,  // changed key to match frontend hook
            success: true 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};

// Admin gets all applicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: { path: 'applicant' }
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found.', success: false });
        }

        return res.status(200).json({ job, success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};

// Update application status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({ message: 'Status is required.', success: false });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found.", success: false });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Status updated successfully.", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};
