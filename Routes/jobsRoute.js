import express from 'express'
import {postJob,getJobs,editJob,deleteJob,partialEditJob} from '../Controllers/JobsController.js'


const router =express.Router();


router.post('/postjob',postJob);
router.get('/getjobs',getJobs);
router.put('/modify/:jobId',editJob);
router.patch('/partialModify/:jobId',partialEditJob);
router.delete('/delete/:jobId',deleteJob);

export default router;