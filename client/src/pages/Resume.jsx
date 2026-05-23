import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from '../utils/axios';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const fileRef = useRef();
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') {
      setFile(dropped);
      setError('');
    } else {
      setError('Please upload a PDF file only');
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type === 'application/pdf') {
      setFile(selected);
      setError('');
    } else {
      setError('Please upload a PDF file only');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await axios.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setQuestions(res.data.questions);
      localStorage.setItem('interviewQuestions', JSON.stringify(res.data.questions));
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a14' }}>
      <Navbar />
      <Sidebar />

      <main className="md:ml-64 pt-24 px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-black text-white mb-2">Upload Resume</h1>
          <p className="text-gray-400 mb-8">Upload your PDF resume and get AI-generated interview questions</p>

          {/* Drop Zone */}
          <motion.div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
            animate={{ scale: dragging ? 1.02 : 1 }}
            className="relative rounded-3xl p-12 text-center cursor-pointer mb-6 transition-all"
            style={{
              border: `2px dashed ${dragging || file ? '#6366f1' : 'rgba(99,102,241,0.3)'}`,
              background: dragging
                ? 'rgba(99,102,241,0.1)'
                : 'rgba(26,26,46,0.9)',
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-white font-bold text-lg">{file.name}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-indigo-400 text-sm mt-3">Click to change file</p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-6xl mb-4">☁️</div>
                  <p className="text-white font-bold text-lg">
                    Drag & drop your resume here
                  </p>
                  <p className="text-gray-400 text-sm mt-2">or click to browse</p>
                  <p className="text-gray-600 text-xs mt-3">PDF only · Max 5MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4"
            >
              {error}
            </motion.div>
          )}

          {/* Upload Button */}
          {file && !questions.length && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg mb-6 disabled:opacity-50"
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
                  Analyzing Resume with AI...
                </span>
              ) : '🚀 Generate Interview Questions'}
            </motion.button>
          )}

          {/* Questions */}
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-black text-white mb-6">
                ✨ Your Interview Questions
              </h2>
              <div className="space-y-4 mb-8">
                {questions.map((q, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-5 rounded-2xl"
                    style={{
                      background: 'rgba(26,26,46,0.9)',
                      border: '1px solid rgba(99,102,241,0.2)',
                    }}
                  >
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      {i + 1}
                    </span>
                    <p className="text-gray-200 leading-relaxed">{q}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/interview')}
                className="w-full py-4 rounded-2xl font-bold text-white text-lg"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                }}
              >
                🎯 Start Mock Interview
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Resume;