-- db: ./data/vestr.db
-- (to quickly build/test queries) lua functions in my init.lua parse the first line of the file, execute the contents of this file against the db at that path, then open a terminal buffer to display the results at the bottom of the window. the path needs to be relative to $(pwd)

SELECT
  q.id as question_id,
  q.question_text,
  o.id as option_id,
  o.option_text
FROM questions q
LEFT JOIN options o ON q.id = o.question_id
WHERE q.quiz_id = 1;
