const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const inputDiv = document.querySelector(".input"); // Select the entire input div

function speak(text) {
    window.speechSynthesis.cancel();
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning! How can I assist you?");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon! Need any help?");
    } else {
        speak("Good Evening! How can I assist you?");
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

recognition.onerror = (event) => {
    console.log("Speech recognition error:", event.error);
    content.textContent = "Error recognizing speech.";
};

// 🎯 Make the whole "input" div clickable for voice command activation
inputDiv.addEventListener("click", () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hey") || message.includes("hello")) {
        speak("Hello, how can I help you?");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com", "_blank");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com", "_blank");
    } else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
        const searchQuery = message.split(" ").join("+");
        speak("Here’s what I found on the internet regarding " + message);
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    } else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speak("The time is " + time);
    } else if (message.includes("calculator")) {
        speak("Opening Calculator...");
        window.open("https://www.google.com/search?q=calculator", "_blank");
    } else {
        const searchQuery = message.split(" ").join("+");
        speak("I found some information about " + message);
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    }
}

wishMe();


