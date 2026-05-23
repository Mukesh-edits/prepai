import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from '../utils/axios';

const History = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/interview/history');
      setInterviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return '🔥 Excellent';
    if (score >= 60) return '👍 Good';
    return '💪 Keep Practicing';
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a14' }}>
      <Navbar />
      <Sidebar />

      <main className="md:ml-64 pt-24 px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-black text-white mb-2">Interview History</h1>
          <p className="text-gray-400 mb-8">Track your progress over time</p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : interviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-7xl mb-4">📊</div>
              <p className="text-white font-bold text-xl mb-2">No interviews yet</p>
              <p className="text-gray-400">Complete your first interview to see history here</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview, i) => (
                <motion.div
                  key={interview._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(26,26,46,0.9)',
                    border: '1px solid rgba(99,102,241,0.15)',
                  }}
                >
                  {/* Header */}
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => setSelected(selected === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-lg flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${getScoreColor(interview.totalScore)}, ${getScoreColor(interview.totalScore)}99)` }}>
                        {interview.totalScore}%
                      </div>
                      <div>
                        <p className="text-white font-bold">{getScoreLabel(interview.totalScore)}</p>
                        <p className="text-gray-400 text-sm">
                          {interview.questions?.length} questions •{' '}
                          {new Date(interview.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden md:flex gap-1">
                        {interview.scores?.map((score, j) => (
                          <div key={j}
                            className="w-2 h-8 rounded-full"
                            style={{
                              background: score >= 7 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444',
                              opacity: 0.8
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xl">
                        {selected === i ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {selected === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-800 p-6 space-y-4"
                    >
                      {interview.questions?.map((question, j) => (
                        <div key={j} className="p-4 rounded-xl"
                          style={{ background: 'rgba(15,15,26,0.8)' }}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                              {j + 1}
                            </span>
                            <p className="text-white text-sm font-medium">{question}</p>
                          </div>
                          <div className="ml-10 space-y-2">
                            <p className="text-gray-400 text-xs">
                              <span className="text-indigo-400 font-medium">Your answer: </span>
                              {interview.answers?.[j] || 'No answer'}
                            </p>
                            <p className="text-gray-400 text-xs">
                              <span className="text-emerald-400 font-medium">Feedback: </span>
                              {interview.feedbacks?.[j] || 'No feedback'}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 text-xs">Score:</span>
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{
                                  background: interview.scores?.[j] >= 7 ? '#10b981' :
                                    interview.scores?.[j] >= 5 ? '#f59e0b' : '#ef4444'
                                }}>
                                {interview.scores?.[j]}/10
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default History;