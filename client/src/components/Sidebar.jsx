import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/resume', icon: '📄', label: 'Resume' },
  { to: '/interview', icon: '🎯', label: 'Interview' },
  { to: '/history', icon: '📊', label: 'History' },
];

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed left-0 top-16 h-full w-64 hidden md:flex flex-col py-8 px-4 gap-2"
      style={{
        background: 'rgba(15, 15, 30, 0.98)',
        borderRight: '1px solid rgba(99, 102, 241, 0.15)',
      }}
    >
      {/* User profile */}
      <div className="flex items-center gap-3 px-4 py-4 rounded-2xl mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.2)',
        }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white text-sm font-bold">{user?.name}</p>
          <p className="text-gray-500 text-xs">Interview Candidate</p>
        </div>
      </div>

      {/* Navigation Links */}
      <p className="text-gray-600 text-xs uppercase tracking-widest px-4 mb-2">Navigation</p>
      {links.map((link, i) => (
        <motion.div
          key={link.to}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 * i + 0.3 }}
        >
          <NavLink
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
            style={({ isActive }) => isActive ? {
              background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))',
              border: '1px solid rgba(99,102,241,0.3)',
            } : {}}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        </motion.div>
      ))}

      {/* Pro Tip */}
      <div className="mt-4 mx-2 p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.2)',
        }}>
        <p className="text-white text-sm font-semibold mb-1">🚀 Pro Tip</p>
        <p className="text-gray-400 text-xs leading-relaxed">Practice daily to improve your interview score!</p>
      </div>

      {/* Copyright at bottom */}
      <div className="mt-auto px-4 pb-20">
        <div className="h-px w-full mb-4"
          style={{ background: 'rgba(99,102,241,0.15)' }} />
        <p className="text-gray-600 text-xs text-center leading-relaxed">
          © 2026 <span className="text-indigo-400 font-medium">PrepAI</span>
          <br />
          Built by <span className="text-indigo-400 font-medium">Mukesh</span>
        </p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;