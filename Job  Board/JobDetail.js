import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            const response = await axios.get(`/api/jobs/${id}`);
            setJob(response.data.data);
        };

        fetchJob();
    }, [id]);

    return (
        <div>
            {job ? (
                <div>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <p>{job.description}</p>
                    {/* Apply button */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default JobDetail;
