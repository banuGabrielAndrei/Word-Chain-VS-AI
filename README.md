# Word Chain vs AI

Welcome to the **Word Chain vs AI** game! This classic word chain game allows you to challenge an AI powered by the GEMINI-API. 

Start the Game: Run the following command in your terminal: npm start
The game will start at http://localhost:3000.

How to Play
Lives: Both the User and the AI start with 5 lives each.

Gameplay Rules:

The game begins with the User's turn.
The word in the chain must be formed using the last two characters of the current word.
Each word must be greater than 2 characters.

User Actions:
If you cannot think of a word that fits the criteria, you can click the "Give Up" button. This will deduct one life from the USER.

AI Response:
If the AI cannot produce a word based on your input, it will respond with "I lost," causing it to lose one life.

Winning the Game:
The game ends when either the User or the AI reaches 0 lives.

A Restart button will appear after the game finishes, allowing you to reset everything to 0.

Stopping the Game
To stop the game, press Ctrl + C in the terminal and confirm by typing YES.
