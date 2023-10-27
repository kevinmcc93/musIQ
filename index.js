let scoreElement; // Declare scoreElement globally

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded");

    const keys = {
      aMinor: ["A", "B", "C", "D", "E", "F", "G"],
      bMinor: ["B", "C#", "D", "E", "F#", "G", "A"],
      cMinor: ["C", "D", "D#", "F", "G", "G#", "A#"],
      dMinor: ["D", "E", "F", "G", "A", "A#", "C"],
      eMinor: ["E", "F#", "G", "A", "B", "C", "D"],
      fMinor: ["F", "G", "G#", "A#", "C", "C#", "D#"],
      gMinor: ["G", "A", "A#", "C", "D", "D#", "F"],
      aMajor: ["A", "B", "C#", "D", "E", "F#", "G#"],
      bMajor: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
      cMajor: ["C", "D", "E", "F", "G", "A", "B"],
      dMajor: ["D", "E", "F#", "G", "A", "B", "C#"],
      eMajor: ["E", "F#", "G#", "A", "B", "C#", "D#"],
      fMajor: ["F", "G", "A", "A#", "C", "D", "E"],
      gMajor: ["G", "A", "B", "C", "D", "E", "F#"],
    };
  
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    let gameEnded = false; // Add a game state variable
      
    // Get a random key and note index
    const randomKey = getRandomKey();
    const randomIndex = getRandomIndex();
    const randomNote = randomKey.notes[randomIndex];
    const bump = randomIndex + 1;
  
    questionElement.textContent = `What is note ${bump} of ${randomKey.name}?`;
  
    // Generate options
    const options = generateOptions(randomKey, randomNote);

    let score = 0;
    const scoreElement = document.getElementById("score");

    function updateScore() {
        score += 1;
        scoreElement.textContent = score;
    }
  
// Create option buttons
    for (const option of options) {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option", "active-option"); // Add the "active-option" class
        optionButton.addEventListener("click", function () {
        checkAnswer(option, randomNote);
        });
        optionsElement.appendChild(optionButton);
    }

    function endGame() {
        console.log("ENDING GAME")
        if (!gameEnded) {
            gameEnded = true;
            const finalScore = score;
            displayEndGameMessage(finalScore);
        }
    }

    function startNewGame() {
        console.log("starting new game")
        gameEnded = false;
        score = 0; // Reset the score
        scoreElement.textContent = score; // Update the displayed score
        askNewQuestion(); // Generate a new question
    }

    const endGameModal = document.getElementById("end-game-modal");
    endGameModal.style.display = "none";
    const playAgainButton = document.querySelector("#play-again-button");
    
    function displayEndGameMessage(score) {
        const finalScore = document.getElementById("final-score");
        finalScore.textContent = score;
        endGameModal.style.display = "block";
    }
        
    playAgainButton.addEventListener("click", function() {
        endGameModal.style.display = "none";
        startNewGame();
    });
    

    function checkAnswer(userGuess, answer) {
        const toastElement = document.querySelector(".toast-notification");

        if (userGuess.toUpperCase() === answer.toUpperCase()) {
            // Correct guess
            console.log("GUESSED CORRECTLY")
            toastElement.textContent = "Correct";
            toastElement.style.backgroundColor = "#4CAF50"; // Green background
                
            // Show the toast
            toastElement.style.opacity = 1;
            toastElement.style.transform = "translateY(0)";
            updateScore();
            setTimeout(() => {
                // Hide the toast after a delay
                toastElement.style.opacity = 0;
                toastElement.style.transform = "translateY(20px)";
                askNewQuestion();
            }, 1500); // Adjust the delay as needed
        } else {
            // Incorrect guess
            console.log("GUESSED INCORRECTLY")
            endGame();
        }


    }
    
  
    function getRandomKey() {
      const keyNames = Object.keys(keys);
      const randomKeyName = keyNames[Math.floor(Math.random() * keyNames.length)];
      return { name: randomKeyName, notes: keys[randomKeyName] };
    }
  
    function getRandomIndex() {
      return Math.floor(Math.random() * 7);
    }  
    
    function generateOptions(key, correctNote) {
        const options = [correctNote]; // Start with the correct note
        while (options.length < 3) {
            const randomNote = key.notes[Math.floor(Math.random() * 7)];
            if (!options.includes(randomNote)) {
                options.push(randomNote);
            }
        }
        return shuffle(options);
    }
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function askNewQuestion() {
        console.log("generating question")

      // Clear the options from the previous question
      optionsElement.innerHTML = '';
  
      // Get a new random key and note index
      const randomKey = getRandomKey();
      const randomIndex = getRandomIndex();
      const randomNote = randomKey.notes[randomIndex];
      const bump = randomIndex + 1;
  
      // Set the new question
      questionElement.textContent = `What is note ${bump} of ${randomKey.name}?`;
  
      // Generate new options and create option buttons
      const options = generateOptions(randomKey, randomNote);
      for (const option of options) {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option");
        optionButton.addEventListener("click", function () {
          checkAnswer(option, randomNote);
        });
        optionsElement.appendChild(optionButton);
      }
      console.log("question created")

    }
  
    askNewQuestion(); // Display the first question
  });
  