import { motion } from 'framer-motion';

const StatsCard = ({ icon, label, value, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, translateY: -4 }}
      className="relative p-6 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'rgba(26, 26, 46, 0.9)',
        border: `1px solid ${color}30`,
      }}
    >
      {/* Glow effect */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
        style={{ background: color }} />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
          {icon}
        </div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-white text-3xl font-black">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;