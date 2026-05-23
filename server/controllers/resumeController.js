const Resume = require('../models/Resume');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');

const getClient = () => new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({ message: 'Could not extract text from PDF' });
    }

    const completion = await getClient().chat.completions.create({
      model: 'nvidia/nemotron-3-super-120b-a12b:free',
      messages: [
        {
          role: 'user',
          content: `You are an expert technical interviewer. Based on the following resume, generate exactly 10 interview questions. Mix technical and behavioral questions based on the candidate's skills and experience. Return ONLY a JSON array of 10 strings, no other text.

Resume:
${extractedText.substring(0, 3000)}

Return format: ["question1", "question2", ...]`
        }
      ],
    });

    const responseText = completion.choices[0].message.content;

    let questions = [];
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      questions = JSON.parse(jsonMatch[0]);
    }

    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      extractedText,
      questions
    });

    res.status(201).json({
      message: 'Resume uploaded successfully',
      resumeId: resume._id,
      questions,
      fileName: req.file.originalname
    });

  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume, getResume };