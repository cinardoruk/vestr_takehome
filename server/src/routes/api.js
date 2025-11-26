import express from "express";
import { getDatabase } from "../db/database.js";

const router = express.Router();

/*

GET /api/quiz

Returns quiz metadata and a list of questions.

Each question should have: id, questionText, options[], and some way of marking the correct option (not exposed to the frontend until submission, or not used on the client side).

*/

/*
  the json shape I want
  {
    quiz_id: 1
    questions: [
      {
        id:
        questionText:
        options: [
          id
          option_text
        ]
      },
    ]
  }
*/

router.get("/quiz", (req, res) => {
  try {
    const db = getDatabase();

    // Get quiz metadata
    const quizMetadata = db.prepare("SELECT * FROM quizes WHERE id = 1").get();

    // Get questions with options
    const rows = db
      .prepare(
        `
      SELECT
        q.id as question_id,
        q.question_text,
        o.id as option_id,
        o.option_text
      FROM questions q
      LEFT JOIN options o ON q.id = o.question_id
      WHERE q.quiz_id = 1
    `,
      )
      .all();

    /*
    reshape this into the required json shape
    right now, we have each option, but each question is repeated for each option
    we'll iterate over the rows, grabbing each unique question only once, but grabbing each option and placing it under the appropriate question
      */
    const questionsMap = {};

    rows.forEach((row) => {
      if (!questionsMap[row.question_id]) {
        questionsMap[row.question_id] = {
          id: row.question_id,
          questionText: row.question_text,
          options: [],
        };
      }

      questionsMap[row.question_id].options.push({
        id: row.option_id,
        optionText: row.option_text,
      });
    });

    const questions = Object.values(questionsMap);

    const quiz = {
      quiz_id: quizMetadata.id,
      subject: quizMetadata.subject,
      duration: quizMetadata.duration,
      questions: questions,
    };

    res.json({ quiz: quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
