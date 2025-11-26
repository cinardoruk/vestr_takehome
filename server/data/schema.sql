-- db: ./data/vestr.db

-- Create tables

CREATE TABLE IF NOT EXISTS quizes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT,
  duration INTEGER NOT NULL DEFAULT 600
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_text TEXT NOT NULL,
  quiz_id INTEGER,
  FOREIGN KEY(quiz_id) REFERENCES quizes(id)
);

CREATE TABLE IF NOT EXISTS options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  option_text TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS correct_answers (
  question_id INTEGER PRIMARY KEY,
  correct_option_id INTEGER NOT NULL,
  FOREIGN KEY(question_id) REFERENCES questions(id),
  FOREIGN KEY(correct_option_id) REFERENCES options(id)
);

-- Clean tables for fresh seed data at each startup (order matters due to foreign keys)
DELETE FROM correct_answers;
DELETE FROM options;
DELETE FROM questions;
DELETE FROM quizes;

-- seed single quiz (duration in seconds: 600 = 10 minutes)
INSERT INTO quizes (id, subject, duration) VALUES
(1, 'Stocks and the Stock Market', 600);

-- Seed questions
INSERT INTO questions (id, question_text, quiz_id) VALUES
  (1, 'What was the primary innovation introduced by the Dutch East India Company in the 1600s that laid the groundwork for the modern stock market?', 1),
  (2, 'What does P/E ratio (Price-to-Earnings ratio) measure?', 1),
  (3, 'What is the primary purpose of diversification in an investment portfolio?', 1);

-- Seed options for Question 1
INSERT INTO options (id, option_text, question_id) VALUES
  (1, 'Selling rights to profits to foreign people in exchange for local goods', 1),
  (2, 'Paying sailors with shares instead of wages', 1),
  (3, 'Selling ownership shares to private citizens to fund voyages', 1),
  (4, 'Issuing government-backed bonds to finance expeditions', 1);

-- Seed options for Question 2
INSERT INTO options (id, option_text, question_id) VALUES
  (5, 'The total value of a company''s outstanding shares', 2),
  (6, 'How much investors are willing to pay per dollar of earnings', 2),
  (7, 'The percentage return on investment over one year', 2),
  (8, 'The difference between a stock''s highest and lowest price', 2);

-- Seed options for Question 3
INSERT INTO options (id, option_text, question_id) VALUES
  (9, 'To maximize short-term profits', 3),
  (10, 'To reduce overall risk by spreading investments across different assets', 3),
  (11, 'To avoid paying taxes on capital gains', 3),
  (12, 'To guarantee positive returns in all market conditions', 3);

-- Seed correct answers
INSERT INTO correct_answers (question_id, correct_option_id) VALUES
  (1, 3),
  (2, 6),
  (3, 10);
