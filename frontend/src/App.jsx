import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import JobDetail from './JobDetail';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('intern');

  const fetchJobs = async (query) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs?q=${query}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(searchTerm);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job & Internship Listings</h1>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Search for jobs (e.g., React, Marketing, Backend)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {jobs.length === 0 ? (
        <p>No results found.</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{job.job_title}</h2>
            <p className="text-sm text-gray-600">{job.employer_name} – {job.job_city}</p>
            <p className="mt-2 text-gray-800">{job.job_description?.slice(0, 150)}...</p>
            <Link
              to={`/job/${index}`}
              state={{ job }}
              className="text-blue-600 underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
