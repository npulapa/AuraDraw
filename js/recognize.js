// ======================================================
// AuraDraw - recognize.js
// Displays AI Recognition Result
// Reads data from LocalStorage
// ======================================================

// ------------------------------------------------------
// Get Elements
// ------------------------------------------------------

const drawingImage = document.getElementById("drawingImage");
const predictionText = document.getElementById("prediction");
const confidenceText = document.getElementById("confidence");
const confidenceBar = document.getElementById("confidenceBar");
const descriptionText = document.getElementById("description");

const drawAgainBtn = document.getElementById("drawAgainBtn");
const learnMoreBtn = document.getElementById("learnMoreBtn");
const videosBtn = document.getElementById("videosBtn");

// ------------------------------------------------------
// Load Stored Data
// ------------------------------------------------------

const image = localStorage.getItem("drawingImage");
const prediction = localStorage.getItem("prediction") || "Unknown";
const confidence = localStorage.getItem("confidence") || "0%";

// ------------------------------------------------------
// Show Image
// ------------------------------------------------------

if (drawingImage && image) {
    drawingImage.src = image;
}

// ------------------------------------------------------
// Show Prediction
// ------------------------------------------------------

if (predictionText) {
    predictionText.textContent = prediction;
}

// ------------------------------------------------------
// Show Confidence
// ------------------------------------------------------

if (confidenceText) {
    confidenceText.textContent = confidence;
}

if (confidenceBar) {
    confidenceBar.style.width = confidence;
    confidenceBar.innerHTML = confidence;
}

// ------------------------------------------------------
// Object Descriptions
// ------------------------------------------------------

const descriptions = {

    Cat:
        "A cat is a small domesticated mammal known for its agility, curiosity, and playful nature.",

    Dog:
        "Dogs are loyal animals that have been companions to humans for thousands of years.",

    Car:
        "A car is a road vehicle used for transportation with four wheels and an engine.",

    Apple:
        "An apple is a nutritious fruit rich in fiber and vitamins.",

    Tree:
        "Trees produce oxygen, provide shade, and play an important role in the environment.",

    House:
        "A house is a building where people live with their families.",

    Bicycle:
        "A bicycle is a two-wheeled vehicle powered by pedaling.",

    Flower:
        "Flowers are colorful parts of plants that produce seeds and attract pollinators.",

    Fish:
        "Fish are aquatic animals that breathe through gills.",

    Bird:
        "Birds are feathered animals capable of flight and laying eggs."

};

// ------------------------------------------------------
// Display Description
// ------------------------------------------------------

if (descriptionText) {

    descriptionText.textContent =
        descriptions[prediction] ||
        "No description available for this object.";

}

// ------------------------------------------------------
// Save to History
// ------------------------------------------------------

let history = JSON.parse(localStorage.getItem("history")) || [];

const alreadyExists = history.some(item =>
    item.image === image &&
    item.prediction === prediction
);

if (!alreadyExists && image) {

    history.unshift({

        image: image,
        prediction: prediction,
        confidence: confidence,
        date: new Date().toLocaleString()

    });

    localStorage.setItem("history", JSON.stringify(history));

}

// ------------------------------------------------------
// Buttons
// ------------------------------------------------------

// Draw Again
if (drawAgainBtn) {

    drawAgainBtn.addEventListener("click", function () {

        window.location.href = "draw.html";

    });

}

// Learn More
if (learnMoreBtn) {

    learnMoreBtn.addEventListener("click", function () {

        const query =
            encodeURIComponent(prediction);

        window.open(
            "https://en.wikipedia.org/wiki/" + query,
            "_blank"
        );

    });

}

// Watch Videos
if (videosBtn) {

    videosBtn.addEventListener("click", function () {

        localStorage.setItem(
            "videoTopic",
            prediction
        );

        window.location.href = "videos.html";

    });

}

// ------------------------------------------------------
// Console
// ------------------------------------------------------

console.log("AuraDraw Recognition Loaded");
console.log("Prediction :", prediction);
console.log("Confidence :", confidence);
console.log("History Saved Successfully");
