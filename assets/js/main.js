/*
Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

Consigli del giorno:
Pensate prima in italiano.
Dividete in piccoli problemi la consegna.
Individuate gli elementi di cui avete bisogno per realizzare il programma.

Bonus:
Invece di usare prompt e allerte usate inputs ed elementi della dom per mostrare a schermo il risultato.
*/

// Select the welcome message that will disappear when user starts the game
const welcomeMessage = document.getElementById("welcome_message");

// Select the button to start the game
const playButton = document.querySelector("#welcome_message > button");

// Select the ul that will output the numbers to memorize
const numbersListElement = document.getElementById("numbers_list");

// Select the form that will provide the inputs to the user
const formElement = document.getElementById("user_inputs")

// Select the element that will contain the final message with the score
const resultElement = document.getElementById("result");

playButton.addEventListener("click", () => {
  const numbersToMemorize = generateNumbers();
  welcomeMessage.style.display = "none";
  appendNumbersToDOM(numbersListElement, numbersToMemorize);
  setTimeout(() => {
    numbersListElement.remove();
    formElement.style.display = "flex";
    checkInputs(numbersToMemorize, formElement, resultElement, numbersListElement);
  }, 30000);
});

// <---------- FUNCTIONS ---------->

/**
 * Generates 5 random numbers between 1 and 100, both included
 * @returns {number[]} An array of random generated numbers
 */
function generateNumbers() {
  const numbersArray = [];
  while (numbersArray.length < 5) {
    // Numbers between 1 and 100 (both included) will be generated
    const singleNumberToMemorize = Math.floor(Math.random() * 100) + 1;
    // Check if a number is already in the array
    if (!numbersArray.includes(singleNumberToMemorize)) {
      numbersArray.push(singleNumberToMemorize);
    }
  }
  return numbersArray;
}

/**
 * Inserts the random generated numbers into the container element of the DOM
 * @param {HTMLElement} container Container element of the DOM
 * @param {number[]} elements Array of random generated numbers 
 */
function appendNumbersToDOM(container, elements) {
  // Iterate through the whole array
  for (let i = 0; i < elements.length; i++) {
    // Append each element to the DOM
    const currentElement = document.createElement("li");
    currentElement.innerText = elements[i];
    container.append(currentElement);
  }
}

/**
 * Checks how many and which numbers the user has correctly guessed
 * @param {number[]} generatedNumbers Array of random generated numbers 
 * @param {HTMLElement} form The form where the user will input the numbers to guess
 * @param {HTMLElement} outputContainer The element of the DOM that will contain the score output. Used as a passthrough
 * @param {HTMLElement} numbersToGuessList The element of the DOM that shows the random generated numbers
 */
function checkInputs(generatedNumbers, form, outputContainer, numbersToGuessList) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Create an array that will container the right numbers
    const rightNumbers = [];
    // check if the inserted numbers are into the array of generated numbers
    for (let i = 0; i < 5; i++) {
      // Add a second condition to avoid that the user can input 5 times the same correct number and have a score of 5 / 5
      if (generatedNumbers.includes(Number(e.target[i].value)) && !rightNumbers.includes(Number(e.target[i].value))) {
        rightNumbers.push(Number(e.target[i].value));
      }
    }
    // Set the score
    let score = rightNumbers.length;
    // Run the function to output the score
    outputScore(outputContainer, score, rightNumbers, numbersToGuessList, form);
  });
}

/**
 * Shows in the page how many and which numbers the user correctly guessed
 * @param {HTMLElement} outputContainer The element of the DOM that will contain the score output. Used as a passthrough
 * @param {number} score The score given by the amount of correctly guessed numbers
 * @param {number[]} guessedNumbers An array that contains the correctly guessed numbers
 * @param {HTMLElement} numbersToGuessList The element of the DOM that shows the random generated numbers
 * @param {HTMLElement} form The form where the user will input the numbers to guess
 */
function outputScore(outputContainer, score, guessedNumbers, numbersToGuessList, form) {
  // Hide the form and the inputs from the DOM
  numbersToGuessList.style.display = "none";
  form.style.display = "none";

  // Outputs the score based on its value
  if (score != 0) {
    outputContainer.innerText = `You correctly guessed ${score} out of 5 numbers. They are:`;
    for (let i = 0; i < guessedNumbers.length; i++) {
      if (i != guessedNumbers.length - 1) {
        outputContainer.innerText += ` ${guessedNumbers[i]},`;
      } else {
        // Slice away the last coma from the second-last number
        outputContainer.innerText = outputContainer.innerText.slice(0, outputContainer.innerText.length-1);
        // Insert an "and" in front of the number if it's the last one
        outputContainer.innerText += ` and ${guessedNumbers[i]}`;
      }
    }
  } else {
    outputContainer.innerText = `You correctly guessed ${score} out of 5 numbers.`;
  }
}