import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import JobDetail from './JobDetail';
import './styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">Trabahunt</Link></div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Trabahunt. All rights reserved.</p>
    </footer>
  );
}

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async (query) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs?q=${query}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(searchTerm);
  };

  return (
    <div className="main-content">
      <div className="intro-section">
        <h1>Explore Careers & Internships</h1>
        <p>Find the right opportunity for you!</p>

        {/* Enhanced Search Bar */}
        <form onSubmit={handleSearch} className="search-form-enhanced">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for jobs (e.g., React, Marketing)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="results-section">
        {jobs.length === 0 ? (
          <p></p>
        ) : (
          jobs.map((job, index) => (
            <div key={index} className="card">
              <h2 className="text-xl font-semibold job-title">{job.job_title}</h2>
              <p className="text-sm text-gray-600">{job.employer_name} – {job.job_city}</p>
              <p className="mt-2 text-gray-800">{job.job_description?.slice(0, 150)}...</p>
              <Link
                to={`/job/${index}`}
                state={{ job }}
                className="view-details-button"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
