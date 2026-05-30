# 🤖 PrepAI

> AI-Powered Mock Interview Coach — upload your resume, get a personalized interview, and track your growth....

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/atlas)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-FF6B6B)](https://openrouter.ai)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## ✨ What is PrepAI?

PrepAI lets you drop your resume and instantly get a personalized AI-powered mock interview. It reads your actual projects and skills to generate relevant questions — then evaluates every answer with detailed feedback, scores, and improvement tips.

- 🔐 **JWT Authentication** — secure signup and login with JSON Web Tokens
- 📄 **PDF Resume Upload** — drag and drop your resume to get started
- 🧠 **AI Question Generation** — 10 personalized interview questions based on your real projects and skills
- 🎤 **Voice Input** — answer questions by speaking using the Web Speech API
- 📊 **AI Answer Evaluation** — each answer scored out of 10 with feedback, strengths, and improvement areas
- 🕓 **Interview History** — all past interviews saved with full question, answer, and feedback breakdown
- 📈 **Progress Tracking** — dashboard shows total interviews, average score, best score, and improvement over time
- 🌙 **Dark Mode UI** — fully responsive dark-themed interface with smooth animations

---

## 🚀 Live Demo

👉 Coming soon — deploy link here

---

## 🛠️ Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens)
![Multer](https://img.shields.io/badge/Multer-FF6900)
![PDF Parse](https://img.shields.io/badge/PDF--Parse-red)

**AI**

![OpenRouter](https://img.shields.io/badge/OpenRouter_AI_(NVIDIA_Nemotron)-FF6B6B)
![Web Speech API](https://img.shields.io/badge/Web_Speech_API-4285F4?logo=google&logoColor=white)

---

## 📁 Project Structure

```
prepai/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable components
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── StatsCard.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/             # Page components
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Resume.jsx
│       │   ├── Interview.jsx
│       │   └── History.jsx
│       ├── context/           # Auth context
│       │   └── AuthContext.jsx
│       └── utils/             # Axios config
│           └── axios.js
└── server/                    # Node.js backend
    ├── controllers/           # Route handlers
    │   ├── authController.js
    │   ├── resumeController.js
    │   └── interviewController.js
    ├── middleware/            # JWT middleware
    │   └── authMiddleware.js
    ├── models/                # MongoDB schemas
    │   ├── User.js
    │   ├── Resume.js
    │   └── Interview.js
    ├── routes/                # API routes
    │   ├── authRoutes.js
    │   ├── resumeRoutes.js
    │   └── interviewRoutes.js
    └── server.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB (local or [MongoDB Atlas](https://mongodb.com/atlas))
- OpenRouter API key — free at [openrouter.ai](https://openrouter.ai)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mukesh-edits/prepai.git
cd prepai

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/prepai
JWT_SECRET=your_secret_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Run Locally

```bash
# Start the backend
cd server && npm run dev

# Start the frontend (new terminal)
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Endpoints

**Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

**Resume**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/upload` | Upload PDF and generate questions |
| GET | `/api/resume` | Get latest uploaded resume |

**Interview**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/interview/evaluate` | Evaluate an answer using AI |
| POST | `/api/interview/save` | Save completed interview |
| GET | `/api/interview/history` | Get all past interviews |

---

## 🔮 Future Improvements

- [ ] Deploy frontend on Vercel, backend on Render
- [ ] Company-specific interview mode (Google, Amazon, Microsoft)
- [ ] Shareable score card for LinkedIn
- [ ] Video recording of interview sessions
- [ ] Leaderboard to compare scores with other users

---

## 💡 What I Learned

- Building a complete full-stack application from scratch
- JWT authentication flow with protected routes
- PDF parsing and text extraction on the backend
- Integrating AI APIs into a real product
- Implementing voice input using the Web Speech API
- Designing a production-quality dark UI with animations

---

## 👤 Author

**Mukesh Kumar** — 3rd Year Software Engineering Student, VIT Vellore

[![GitHub](https://img.shields.io/badge/GitHub-Mukesh--edits-181717?logo=github)](https://github.com/Mukesh-edits)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
