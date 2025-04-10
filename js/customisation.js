// Function to get a random word from the list
let previousWord = "";

function changeHeaderBackground(color) {
    document.querySelector("header").style.backgroundColor = color;
}

function changeHeaderFontColor(color) {
    document.querySelector("header").style.color = color;
}

function changeHeaderFontSize(size) {
    let isTooBig = size > 30;

    if (isTooBig) {
        size = 28;
        document.querySelector("header").style.fontSize = size + "px";
    } else {
        document.querySelector("header").style.fontSize = size + "px";
    }
}

function changeSidebarBackground(color) {
    document.querySelector("nav").style.backgroundColor = color;
}

function changeSidebarFontColor(color) {
    document.querySelectorAll("nav a").forEach(a => {
        a.style.color = color;
    });
}

function changeSidebarFontSize(size) {
    document.querySelectorAll("nav a").forEach(a => {
        a.style.fontSize = size + "px";
    });
}

function embedYTVideoInTheMainArea(youtubeUrl) {
    const mainContent = document.querySelector(".mainContent");

    // Extract the YouTube video ID from the URL
    const videoId = extractYouTubeVideoID(youtubeUrl);
    if (!videoId) {
        console.error("Invalid YouTube URL");
        return;
    }

    // Create the iframe
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // Clear existing content and embed the video
    mainContent.innerHTML = "";
    mainContent.appendChild(iframe);
}

// Helper function to get the video ID from a full YouTube URL
function extractYouTubeVideoID(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// --- HEADER FUNCTIONS ---
function changeHeaderText(text) {
    const header = document.querySelector("header h1");
    if (header) header.textContent = text;
}

function addEmojiToHeader(emoji) {
    const header = document.querySelector("header h1");
    if (header) header.textContent += ` ${emoji}`;
}

function changeHeaderFontFamily(font) {
    const header = document.querySelector("header");
    if (header) header.style.fontFamily = font;
}

// --- NAVIGATION FUNCTIONS ---
function highlightNavLink(name, color = "yellow") {
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if (link.textContent.trim().toLowerCase() === name.toLowerCase()) {
            link.style.backgroundColor = color;
        }
    });
}

// --- MAIN CONTENT FUNCTIONS ---
function addParagraphToMain(text) {
    const mainContent = document.querySelector(".mainContent");
    const p = document.createElement("p");
    p.textContent = text;
    mainContent.appendChild(p);
}

function setMainContentBackground(color) {
    const mainContent = document.querySelector(".mainContent");
    mainContent.style.backgroundColor = color;
}

function clearMainContent() {
    const mainContent = document.querySelector(".mainContent");
    mainContent.innerHTML = "";
}

// --- ASIDE CONTENT FUNCTIONS ---
function addImageToAside(url, alt = "Image", width = "100%") {
    const aside = document.querySelector(".asideContent");
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt;
    img.style.width = width;
    aside.appendChild(img);
}

function addNoteToAside(note) {
    const aside = document.querySelector(".asideContent");
    const noteBox = document.createElement("div");
    noteBox.textContent = note;
    noteBox.style.backgroundColor = "#f9f9a1";
    noteBox.style.padding = "10px";
    noteBox.style.marginTop = "10px";
    noteBox.style.borderRadius = "8px";
    aside.appendChild(noteBox);
}

function clearAside() {
    const aside = document.querySelector(".asideContent");
    aside.innerHTML = "";
}


function AddMiniGame(gameName, targetId = "mainContent") {
    const container = document.querySelector(`.${targetId}`);

    if (!container) {
        console.error(`Target container ".${targetId}" not found`);
        return;
    }

    switch (gameName) {
        case "MathQuiz":
            createMathQuiz(container);
            break;
        case "GuessTheWord":
            createGuessTheWord(container);
            break;
        // Future games
        case "GKQuiz":
        case "Hangman":
            container.innerHTML += `<p>The game "${gameName}" will be available soon!</p>`;
            break;
        default:
            container.innerHTML += `<p>Game "${gameName}" not recognized.</p>`;
    }
}


// -------------------- MATH QUIZ GAME --------------------

function createMathQuiz(container) {
    // Create quiz elements
    const quizBox = document.createElement("div");
    quizBox.style.border = "2px solid #007BFF";
    quizBox.style.padding = "20px";
    quizBox.style.borderRadius = "10px";
    quizBox.style.backgroundColor = "#f0f8ff";
    quizBox.style.marginTop = "10px";

    const questionEl = document.createElement("p");
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Your answer";
    input.style.marginRight = "10px";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";

    const feedback = document.createElement("p");
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next Q ➕";
    nextBtn.style.display = "none";
    nextBtn.style.marginTop = "10px";

    // Function to generate a new question
    function generateQuestion() {
        feedback.textContent = "";
        input.value = "";
        input.disabled = false;
        submitBtn.disabled = false;
        nextBtn.style.display = "none";

        const num1 = getRandomInt(5, 20);
        const num2 = getRandomInt(2, 12);
        const operations = ["+", "-", "*"];
        const op = operations[getRandomInt(0, operations.length - 1)];
        const questionText = `${num1} ${op} ${num2}`;
        const correctAnswer = eval(questionText);

        questionEl.textContent = `What is ${questionText}?`;

        submitBtn.onclick = () => {
            const userAnswer = Number(input.value);
            if (userAnswer === correctAnswer) {
                feedback.textContent = "How awesome!!! 🎉";
                feedback.style.color = "green";
            } else {
                feedback.textContent = `Oops! The correct answer was ${correctAnswer}.`;
                feedback.style.color = "red";
            }
            input.disabled = true;
            submitBtn.disabled = true;
            nextBtn.style.display = "inline-block";
        };
    }

    // Clicking next will regenerate a new question
    nextBtn.onclick = generateQuestion;

    // Build quiz box
    quizBox.appendChild(questionEl);
    quizBox.appendChild(input);
    quizBox.appendChild(submitBtn);
    quizBox.appendChild(feedback);
    quizBox.appendChild(nextBtn);

    // Append the quiz to the container instead of replacing the content
    container.appendChild(quizBox);

    // Load the first question
    generateQuestion();
}


function createGuessTheWord(container) {
    // Clear previous content
    container.innerHTML = "";

    const gameBox = document.createElement("div");
    gameBox.style.border = "2px solid #007BFF";
    gameBox.style.padding = "20px";
    gameBox.style.borderRadius = "10px";
    gameBox.style.backgroundColor = "#f0f8ff";
    gameBox.style.marginTop = "10px";

    const hintEl = document.createElement("p");
    const wordEl = document.createElement("p");
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.placeholder = "Guess a letter";
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Guess Letter";
    const feedback = document.createElement("p");
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next Word ➕";
    nextBtn.style.display = "none";
    nextBtn.style.marginTop = "10px";

    // Predefined word list with hints
    const words = [
        { word: "Minecraft", hint: "The main character in Minecraft" },
        { word: "JavaScript", hint: "A programming language used for web development" },
        { word: "Elephant", hint: "A large mammal with a trunk" },
        { word: "Piano", hint: "A musical instrument with black and white keys" },
        { word: "Tennis", hint: "A sport played with rackets and a ball" },
        { word: "Python", hint: "A programming language named after a snake" },
        { word: "Penguin", hint: "A flightless bird found in the Southern Hemisphere" },
        { word: "Guitar", hint: "A stringed musical instrument with six strings" },
        { word: "Computer", hint: "A device used for processing and storing data" },
        { word: "Astronaut", hint: "A person trained to travel in space" },
        { word: "Rainbow", hint: "A colorful arc formed after rain" },
        { word: "Soccer", hint: "A popular sport played with a round ball" },
        { word: "Galaxy", hint: "A large system of stars and planets" },
        { word: "Cucumber", hint: "A green vegetable often used in salads" },
        { word: "Chocolate", hint: "A sweet treat made from cocoa beans" },
        { word: "Octopus", hint: "A sea creature with eight arms" },
        { word: "Pizza", hint: "A dish consisting of a dough base topped with cheese and tomato sauce" },
        { word: "Mountain", hint: "A large natural elevation of the Earth's surface" },
        { word: "Laptop", hint: "A portable personal computer" },
        { word: "Whale", hint: "A large sea mammal" }
    ];

    let currentWord = getRandomWord(words);
    let currentWordState = Array(currentWord.word.length).fill("_");

    // Function to update the word display
    function updateWordDisplay() {
        wordEl.textContent = currentWordState.join(" ");
    }

    // Function to start a new word (next question)
    function nextWord() {
        currentWord = getRandomWord(words);
        currentWordState = Array(currentWord.word.length).fill("_");
        updateWordDisplay();
        hintEl.textContent = `Hint: ${currentWord.hint}`;
        feedback.textContent = "";
        input.value = "";
        input.disabled = false;
        submitBtn.disabled = false;
        nextBtn.style.display = "none";
    }

    // Function to handle letter guesses
    function handleGuess() {
        const guessedLetter = input.value.toUpperCase();
        if (guessedLetter.length === 1 && /^[A-Z]$/i.test(guessedLetter)) {
            let correctGuess = false;
            for (let i = 0; i < currentWord.word.length; i++) {
                if (currentWord.word[i].toUpperCase() === guessedLetter && currentWordState[i] === "_") {
                    currentWordState[i] = currentWord.word[i];
                    correctGuess = true;
                }
            }

            if (correctGuess) {
                feedback.textContent = `Good job! You've guessed a letter!`;
                feedback.style.color = "green";
            } else {
                feedback.textContent = `Oops! Try again.`;
                feedback.style.color = "red";
            }

            updateWordDisplay();

            if (!currentWordState.includes("_")) {
                feedback.textContent = "Congratulations! You've guessed the word!";
                feedback.style.color = "blue";
                nextBtn.style.display = "inline-block"; // Show "Next Word" button
            }
        } else {
            feedback.textContent = "Please enter a valid letter.";
            feedback.style.color = "orange";
        }

        input.value = "";
        input.focus();
    }

    // Append game elements to the container
    gameBox.appendChild(hintEl);
    gameBox.appendChild(wordEl);
    gameBox.appendChild(input);
    gameBox.appendChild(submitBtn);
    gameBox.appendChild(feedback);
    gameBox.appendChild(nextBtn);
    container.appendChild(gameBox);

    // Load the first word
    hintEl.textContent = `Hint: ${currentWord.hint}`;
    updateWordDisplay();

    // Handle button clicks
    submitBtn.onclick = handleGuess;
    nextBtn.onclick = nextWord;



    function getRandomWord(wordList) {
        let newWord;
        do {
            newWord = wordList[Math.floor(Math.random() * wordList.length)];
        } while (newWord.word === previousWord);
        previousWord = newWord.word;
        return newWord;
    }
}
