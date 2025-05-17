# OVERVIEW OF THE SYSTEM
The **Trabahunt: Internship and Job Recommendation** system is a web-based application designed to help users easily search for job and internship opportunities. It features a responsive and user-friendly interface built with React, allowing users to input keywords and instantly browse relevant listings. Powered by real-time data from job listing APIs, the system aggregates job openings and displays key information such as job title, company name, location, and application links. This platform aims to simplify the job search process, especially for students and fresh graduates in the Philippines, by centralizing listings and making them more accessible.

## PREREQUISITES
Before proceeding, ensure the following are installed on your system:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Git** (for cloning the repository) 

## HOW TO RUN THE SYSTEM
1. If you are using git, open your terminal or command prompt and run:\
`git clone -b juliene_branch https://github.com/girlaliiing/CMSC-186.git`
+ This clones the specific branch containing the working code.\
+ If you have the zipped file, simply download and unzip the files to your desired directory.

2. Navigate to the `backend` directory and install dependencies:\
`cd CMSC-186`\
`cd backend`\
`npm install`
3. Run the server:\
`node server.js`
+ The terminal should display `Server is running on port 5000`
4. In a new terminal window, navigate to the `frontend` directory and install dependencies:\
`cd ../frontend`\
`npm install`
5. Run the frontend server:\
`npm run dev`

### *The website is now running!*

## TO TEST THE SYSTEM
1. Click the link in the terminal.
2. You should see the website interface.
3. Use the search functionality to fetch job listings.
4. Ensure that both frontend ad backend servers are running.

## ADDITIONAL NOTES
+ **No Database Integration (Yet)**\
This system currently does not utilize a database. All job listings are fetched live from third-party APIs. However, database support (e.g., MySQL or MongoDB) can be integrated in the future to enable features such as user authentication, saved jobs, and application tracking.
+ **API Usage Limitation**\
The system relies on a free-tier job listing API (e.g., JSearch via RapidAPI). This plan has daily and monthly request limits. Once exceeded, job searches may stop working until the quota resets. Consider upgrading to a paid plan or caching responses in the future.
+ **CORS & Localhost**\
The backend uses CORS to allow frontend requests from `localhost`. When deploying the system, be sure to update the CORS policy to allow only trusted origins.
+ **Frontend-Only Deployment Not Advised**\
While technically possible to use the frontend alone by calling APIs directly from the client, this is **not recommended** due to potential API key exposure. Keeping the key in the backend ensures better security.
+ **Future Improvements**\
Suggested enhancements include:
    + Implementing search filters (e.g., location, job type)
    + Adding user accounts and job bookmarks
    + Supporting multiple job APIs for broader results
