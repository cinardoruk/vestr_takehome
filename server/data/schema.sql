-- drop all tables

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  questionText TEXT NOT NULL,

);

CREATE TABLE IF NOT EXISTS options (

  id INTEGER PRIMARY KEY AUTOINCREMENT,
  optionText TEXT NOT NULL,
  questionId INTEGER NOT NULL,
  FOREIGN KEY(questionId) REFERENCES questions(id)

);

-- seed with sample data
