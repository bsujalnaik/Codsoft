import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await axios.get('/api/jobs');
            setJobs(response.data.data);
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        {/* Link to job detail page */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobListings;
