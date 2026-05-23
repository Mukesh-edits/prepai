const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: String }],
  answers: [{ type: String }],
  scores: [{ type: Number }],
  feedbacks: [{ type: String }],
  totalScore: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);