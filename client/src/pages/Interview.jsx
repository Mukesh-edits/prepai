import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from '../utils/axios';

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState({ answers: [], scores: [], feedbacks: [] });
  const [finished, setFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('interviewQuestions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      navigate('/resume');
    }
  }, []);

  // Voice input
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice not supported in this browser. Use Chrome!');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onresult = (e) => {
      setAnswer(prev => prev + ' ' + e.results[0][0].transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/interview/evaluate', {
        question: questions[currentIndex],
        answer
      });
      setEvaluation(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const newData = {
      answers: [...sessionData.answers, answer],
      scores: [...sessionData.scores, evaluation.score],
      feedbacks: [...sessionData.feedbacks, evaluation.feedback],
    };
    setSessionData(newData);

    if (currentIndex + 1 >= questions.length) {
      const avg = [...newData.scores].reduce((a, b) => a + b, 0) / newData.scores.length;
      const total = Math.round(avg * 10);
      setTotalScore(total);

      await axios.post('/interview/save', {
        questions,
        answers: newData.answers,
        scores: newData.scores,
        feedbacks: newData.feedbacks,
        totalScore: total
      });

      setFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setEvaluation(null);
    }
  };

  if (questions.length === 0) return null;

  if (finished) {
    return (
      <div className="min-h-screen" style={{ background: '#0a0a14' }}>
        <Navbar />
        <Sidebar />
        <main className="md:ml-64 pt-24 px-6 pb-12 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center p-10 rounded-3xl"
            style={{
              background: 'rgba(26,26,46,0.9)',
              border: '1px solid rgba(99,102,241,0.3)',
            }}
          >
            <div className="text-7xl mb-6">🏆</div>
            <h1 className="text-4xl font-black text-white mb-2">Interview Complete!</h1>
            <p className="text-gray-400 mb-8">Here's how you did</p>

            <div className="w-36 h-36 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 50px rgba(99,102,241,0.4)',
              }}>
              <div>
                <p className="text-4xl font-black text-white">{totalScore}%</p>
                <p className="text-indigo-200 text-xs">Score</p>
              </div>
            </div>

            <p className="text-gray-400 mb-8">
              {totalScore >= 80 ? '🔥 Excellent performance! You are interview ready!' :
               totalScore >= 60 ? '👍 Good job! Keep practicing to improve.' :
               '💪 Keep practicing! You will get better with time.'}
            </p>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 rounded-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                Dashboard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resume')}
                className="flex-1 py-3 rounded-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                New Interview
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a14' }}>
      <Navbar />
      <Sidebar />
      <main className="md:ml-64 pt-24 px-6 pb-12">
        <div className="max-w-3xl mx-auto">

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round((currentIndex / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <motion.div
                className="h-2 rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-8 rounded-3xl mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
                border: '1px solid rgba(99,102,241,0.3)',
              }}
            >
              <p className="text-indigo-300 text-sm font-medium mb-3 uppercase tracking-widest">Question {currentIndex + 1}</p>
              <p className="text-white text-xl font-bold leading-relaxed">{questions[currentIndex]}</p>
            </motion.div>
          </AnimatePresence>

          {/* Answer area */}
          {!evaluation && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative mb-4">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here or use the voice button..."
                  rows={6}
                  className="w-full p-5 rounded-2xl text-white text-sm leading-relaxed resize-none focus:outline-none"
                  style={{
                    background: 'rgba(26,26,46,0.9)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startListening}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: listening
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: listening ? '0 0 20px rgba(239,68,68,0.5)' : 'none',
                  }}
                >
                  {listening ? '⏹' : '🎤'}
                </motion.button>
              </div>

              {listening && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center mb-4"
                >
                  🔴 Listening... speak now
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEvaluate}
                disabled={loading || !answer.trim()}
                className="w-full py-4 rounded-2xl font-bold text-white text-lg disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 30px rgba(99,102,241,0.3)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    AI is evaluating...
                  </span>
                ) : '🚀 Submit Answer'}
              </motion.button>
            </motion.div>
          )}

          {/* Evaluation result */}
          {evaluation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Score */}
              <div className="flex items-center gap-6 p-6 rounded-2xl"
                style={{ background: 'rgba(26,26,46,0.9)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: evaluation.score >= 7
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : evaluation.score >= 5
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                  }}>
                  <p className="text-white text-2xl font-black">{evaluation.score}/10</p>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1">AI Feedback</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{evaluation.feedback}</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <p className="text-emerald-400 font-bold mb-2">✅ Strengths</p>
                <p className="text-gray-300 text-sm">{evaluation.strengths}</p>
              </div>

              {/* Improvements */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="text-red-400 font-bold mb-2">💡 Improve</p>
                <p className="text-gray-300 text-sm">{evaluation.improvements}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="w-full py-4 rounded-2xl font-bold text-white text-lg"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                }}
              >
                {currentIndex + 1 >= questions.length ? '🏆 Finish Interview' : '➡️ Next Question'}
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Interview;