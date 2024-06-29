const express = require('express');
const { protect } = require('../middlewares/auth');
const { createJob, getJobs, getJob, applyJob } = require('../controllers/jobController');

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(protect, createJob);

router.route('/:id')
    .get(getJob)
    .put(protect, applyJob);

module.exports = router;
