import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import axios from '../utils/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/interview/history');
      setInterviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalInterviews = interviews.length;
  const avgScore = totalInterviews > 0
    ? Math.round(interviews.reduce((a, b) => a + b.totalScore, 0) / totalInterviews)
    : 0;
  const bestScore = totalInterviews > 0
    ? Math.max(...interviews.map(i => i.totalScore))
    : 0;
  const improvement = interviews.length >= 2
    ? interviews[0].totalScore - interviews[interviews.length - 1].totalScore
    : 0;

  const stats = [
    { icon: '🎯', label: 'Interviews Taken', value: totalInterviews.toString(), color: '#6366f1', delay: 0.1 },
    { icon: '⭐', label: 'Average Score', value: `${avgScore}%`, color: '#f59e0b', delay: 0.2 },
    { icon: '🏆', label: 'Best Score', value: `${bestScore}%`, color: '#10b981', delay: 0.3 },
    { icon: '📈', label: 'Improvement', value: `${improvement > 0 ? '+' : ''}${improvement}%`, color: '#8b5cf6', delay: 0.4 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a14' }}>
      <Navbar />
      <Sidebar />

      <main className="md:ml-64 pt-24 px-6 pb-12">

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 mb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 50%, #1a1a3e 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-indigo-300 text-sm font-medium mb-2 uppercase tracking-widest"
            >
              👋 Welcome back
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-black text-white mb-3"
            >
              Hello, <span style={{
                background: 'linear-gradient(90deg, #6366f1, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{user?.name}!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg mb-6"
            >
              {totalInterviews === 0
                ? 'Ready to ace your next interview? Upload your resume to get started!'
                : `You've completed ${totalInterviews} interview${totalInterviews > 1 ? 's' : ''}. Keep going!`}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/resume')}
              className="px-8 py-3 rounded-2xl font-bold text-white text-sm"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
              }}
            >
              🚀 Start New Interview
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white font-bold text-xl mb-4"
        >
          Your Stats
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Recent Interviews + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Interviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 rounded-2xl p-6"
            style={{
              background: 'rgba(26, 26, 46, 0.9)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Recent Interviews</h3>
              {interviews.length > 0 && (
                <button
                  onClick={() => navigate('/history')}
                  className="text-indigo-400 text-sm hover:underline"
                >
                  View all →
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : interviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-gray-400 text-sm">No interviews yet</p>
                <p className="text-gray-600 text-xs mt-1">Start your first mock interview!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {interviews.slice(0, 5).map((interview, i) => (
                  <motion.div
                    key={interview._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => navigate('/history')}
                    className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                    style={{ border: '1px solid rgba(99,102,241,0.1)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${getScoreColor(interview.totalScore)}, ${getScoreColor(interview.totalScore)}88)` }}>
                      {interview.totalScore}%
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {interview.questions?.length} Question Interview
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(interview.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {interview.scores?.slice(0, 5).map((score, j) => (
                        <div key={j} className="w-1.5 h-6 rounded-full"
                          style={{
                            background: score >= 7 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'
                          }} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(26, 26, 46, 0.9)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: '📄', label: 'Upload Resume', color: '#6366f1', path: '/resume' },
                { icon: '🎯', label: 'Start Interview', color: '#8b5cf6', path: '/interview' },
                { icon: '📊', label: 'View History', color: '#06b6d4', path: '/history' },
              ].map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className="flex items-center gap-3 p-4 rounded-xl text-left w-full transition-all"
                  style={{
                    background: `${action.color}15`,
                    border: `1px solid ${action.color}30`,
                  }}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-gray-300 text-sm font-medium">{action.label}</span>
                  <span className="ml-auto text-gray-600">→</span>
                </motion.button>
              ))}
            </div>

            {/* Score progress */}
            {totalInterviews > 0 && (
              <div className="mt-6 p-4 rounded-xl"
                style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}>
                <p className="text-gray-400 text-xs mb-3 font-medium">Average Score Progress</p>
                <div className="w-full h-3 rounded-full bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${avgScore}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-3 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                  />
                </div>
                <p className="text-white text-sm font-bold mt-2">{avgScore}%</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;