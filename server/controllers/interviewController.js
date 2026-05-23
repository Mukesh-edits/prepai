const Interview = require('../models/Interview');
const OpenAI = require('openai');

const getClient = () => new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const completion = await getClient().chat.completions.create({
      model: 'nvidia/nemotron-3-super-120b-a12b:free',
      messages: [
        {
          role: 'user',
          content: `You are an expert technical interviewer. Evaluate this interview answer.

Question: ${question}
Answer: ${answer}

Return ONLY a JSON object in this exact format, no other text:
{
  "score": <number from 0 to 10>,
  "feedback": "<2-3 sentences of specific feedback>",
  "strengths": "<what was good about the answer>",
  "improvements": "<what could be improved>"
}`
        }
      ],
    });

    const responseText = completion.choices[0].message.content;

    let evaluation = {};
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      evaluation = JSON.parse(jsonMatch[0]);
    }

    res.json(evaluation);

  } catch (error) {
    console.error('Evaluation error:', error);
    res.status(500).json({ message: error.message });
  }
};

const saveInterview = async (req, res) => {
  try {
    const { questions, answers, scores, feedbacks, totalScore } = req.body;

    const interview = await Interview.create({
      user: req.user._id,
      questions,
      answers,
      scores,
      feedbacks,
      totalScore
    });

    res.status(201).json({
      message: 'Interview saved successfully',
      interviewId: interview._id
    });

  } catch (error) {
    console.error('Save interview error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(interviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { evaluateAnswer, saveInterview, getInterviews };