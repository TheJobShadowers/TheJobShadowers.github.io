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


function AddMiniGame(gameName, target = "main") {
    const container =
        target === "aside"
            ? document.querySelector(".asideContent")
            : document.querySelector(".mainContent");

    if (!container) {
        console.error("Target container not found");
        return;
    }

    switch (gameName) {
        case "MathQuiz":
            createMathQuiz(container);
            break;
        // Future games can be added here
        case "GKQuiz":
        case "Hangman":
        case "GuessTheWord":
            container.innerHTML += `<p>The game "${gameName}" will be added soon!</p>`;
            break;
        default:
            container.innerHTML += `<p>Game "${gameName}" not recognized.</p>`;
    }
}

// -------------------- MATH QUIZ GAME --------------------

function createMathQuiz(container) {
    // Clear previous content
    container.innerHTML = "";

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

    const button = document.createElement("button");
    button.textContent = "Submit";

    const feedback = document.createElement("p");

    // Generate a simple random math question
    const num1 = getRandomInt(5, 20);
    const num2 = getRandomInt(2, 12);
    const operations = ["+", "-", "*"];
    const op = operations[getRandomInt(0, operations.length - 1)];
    const questionText = `${num1} ${op} ${num2}`;
    const correctAnswer = eval(questionText);

    questionEl.textContent = `What is ${questionText}?`;

    button.onclick = () => {
        const userAnswer = Number(input.value);
        if (userAnswer === correctAnswer) {
            feedback.textContent = "How awesome!!! 🎉";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Oops! Try again!";
            feedback.style.color = "red";
        }
    };

    quizBox.appendChild(questionEl);
    quizBox.appendChild(input);
    quizBox.appendChild(button);
    quizBox.appendChild(feedback);
    container.appendChild(quizBox);
}

// Utility function for random numbers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
