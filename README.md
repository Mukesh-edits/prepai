PrepAI — AI-Powered Mock Interview Coach
A full-stack web application that reads your resume and conducts a personalized mock interview using AI. Built with React, Node.js, MongoDB, and OpenRouter AI.

Features

JWT Authentication — Secure signup and login with JSON Web Tokens
PDF Resume Upload — Drag and drop your resume to get started
AI Question Generation — AI reads your resume and generates 10 personalized interview questions based on your actual projects and skills
Voice Input — Answer questions by speaking using the Web Speech API
AI Answer Evaluation — Each answer is scored out of 10 with detailed feedback, strengths, and improvement areas
Interview History — All past interviews are saved with full question, answer, and feedback breakdown
Progress Tracking — Dashboard shows total interviews, average score, best score, and improvement over time
Dark Mode UI — Fully responsive dark themed interface with smooth animations


Tech Stack
Frontend

React 18
Vite
Tailwind CSS
Framer Motion
React Router DOM
Axios

Backend

Node.js
Express.js
MongoDB
Mongoose
JWT (jsonwebtoken)
Bcryptjs
Multer
PDF-Parse

AI

OpenRouter API (NVIDIA Nemotron model)
Web Speech API (voice input)


Project Structure
prepai/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Interview.jsx
│   │   │   └── History.jsx
│   │   ├── context/          # Auth context
│   │   │   └── AuthContext.jsx
│   │   └── utils/            # Axios config
│   │       └── axios.js
│   └── package.json
│
└── server/                   # Node.js backend
    ├── controllers/          # Route handlers
    │   ├── authController.js
    │   ├── resumeController.js
    │   └── interviewController.js
    ├── middleware/            # JWT middleware
    │   └── authMiddleware.js
    ├── models/               # MongoDB schemas
    │   ├── User.js
    │   ├── Resume.js
    │   └── Interview.js
    ├── routes/               # API routes
    │   ├── authRoutes.js
    │   ├── resumeRoutes.js
    │   └── interviewRoutes.js
    ├── server.js
    └── package.json

Getting Started
Prerequisites

Node.js v18 or higher
MongoDB (local installation or MongoDB Atlas)
OpenRouter API key — free at openrouter.ai

Installation

Clone the repository

bashgit clone https://github.com/Mukesh-edits/prepai.git
cd prepai

Install server dependencies

bashcd server
npm install

Install client dependencies

bashcd ../client
npm install

Create a .env file inside the server folder

PORT=5000
MONGO_URI=mongodb://localhost:27017/prepai
JWT_SECRET=your_secret_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here

Start the backend server

bashcd server
npm run dev

Start the frontend

bashcd client
npm run dev

Open your browser and go to http://localhost:5173


API Endpoints
Auth

POST /api/auth/register — Register a new user
POST /api/auth/login — Login and get JWT token

Resume

POST /api/resume/upload — Upload PDF and generate questions
GET /api/resume — Get latest uploaded resume

Interview

POST /api/interview/evaluate — Evaluate an answer using AI
POST /api/interview/save — Save completed interview
GET /api/interview/history — Get all past interviews


Environment Variables

PORT — Server port (default 5000)
MONGO_URI — MongoDB connection string
JWT_SECRET — Secret key for JWT tokens
OPENROUTER_API_KEY — API key from openrouter.ai


What I Learned

Building a complete full-stack application from scratch
JWT authentication flow with protected routes
PDF parsing and text extraction on the backend
Integrating AI APIs into a real product
Implementing voice input using the Web Speech API
Designing a production-quality dark UI with animations


Future Improvements

Deploy frontend on Vercel and backend on Render
Add company-specific interview mode (Google, Amazon, Microsoft)
Add a shareable score card that users can post on LinkedIn
Add video recording of interview sessions
Add leaderboard to compare scores with other users


Author
Mukesh Kumar
3rd Year Software Engineering Student — VIT Vellore
GitHub: https://github.com/Mukesh-edits

License
This project is open source and available under the MIT License.