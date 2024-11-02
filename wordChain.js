document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitWord');
    const giveUpButton = document.getElementById('giveUpButton');
    const restartButton = document.getElementById('restartButton');
    const playerWordInput = document.getElementById('playerWord');
    const messageContainer = document.getElementById('messageContainer');
    const responseContainer = document.getElementById('responseContainer');
    const playerLivesDisplay = document.getElementById('playerLives');
    const aiLivesDisplay = document.getElementById('aiLives');

    let playerLives = 5;
    let aiLives =5;

    const livesDisplay = () => {
        playerLivesDisplay.textContent = `Your Lives: ${playerLives}`;
        aiLivesDisplay.textContent = `AI Lives: ${aiLives}`;
        if (playerLives <= 2) {
            playerLivesDisplay.classList.add('red');
        } else {
            playerLivesDisplay.classList.remove('red');
        }
        if (aiLives <= 2) {
            aiLivesDisplay.classList.add('red');
        } else {
            aiLivesDisplay.classList.remove('red');
        }
    };

    const checkGame = () => {
        if (playerLives == 0) {
            messageContainer.textContent = "You lost. AI Wins!";
            stopGame();
        } else if (aiLives == 0) {
            messageContainer.textContent = "Hooray🏆. You won the game!";
            stopGame();
        }
    };

    const stopGame = () => {
        submitButton.disabled = true;
        giveUpButton.disabled = true;
        playerWordInput.disabled = true;
        restartButton.style.display = 'block';
    };

    const restartGame = () => {
        playerLives = 5;
        aiLives = 5;
        playerWordInput.value = ''; 
        messageContainer.textContent = '';
        responseContainer.textContent = '';
        submitButton.disabled = false;
        giveUpButton.disabled = false;
        playerWordInput.disabled = false;
        restartButton.style.display = 'none';
        livesDisplay();
    };

    livesDisplay();

     submitButton.addEventListener('click', async () => {
        const playerWord = playerWordInput.value.trim();
        messageContainer.textContent = '';
        responseContainer.textContent = 'Thinking...';
        if (playerWord.length < 3) {
            messageContainer.textContent = "Please enter a word with more than 2 letters.";
            return;
        }
        try {
            const response = await fetch('/api/wordchain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word: playerWord })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const aiWord = data.aiWord;
            if (aiWord == "I lost.") {
                --aiLives;
                responseContainer.textContent = `AI's response: ${aiWord}`;
                messageContainer.textContent = `AI has ${aiLives} lives left.`;
            } else {
                responseContainer.textContent = `AI's response: ${aiWord}`;
            }
            livesDisplay();
            checkGame();
        } catch (error) {
            console.error("Error:", error);
            messageContainer.textContent = "An error occurred. Please try again.";
        }
    });

    giveUpButton.addEventListener('click', () => {
        --playerLives;
        messageContainer.textContent = `You gave up! You have ${playerLives} lives left.`;
        livesDisplay();
        checkGame();
    });

    restartButton.addEventListener('click', restartGame);
});