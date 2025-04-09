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

