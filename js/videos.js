// ======================================================
// AuraDraw - videos.js
// Displays Recommended Learning Videos
// ======================================================

// ------------------------------------------------------
// Get Elements
// ------------------------------------------------------

const videoContainer = document.getElementById("videoContainer");
const topicTitle = document.getElementById("topicTitle");

// ------------------------------------------------------
// Selected Topic
// ------------------------------------------------------

const topic =
    localStorage.getItem("videoTopic") || "Drawing";

// ------------------------------------------------------
// Page Title
// ------------------------------------------------------

if (topicTitle) {
    topicTitle.textContent = "Learning Videos : " + topic;
}

// ------------------------------------------------------
// Video Database
// ------------------------------------------------------

const videoLibrary = {

    Cat: [
        {
            title: "How to Draw a Cat",
            video: "https://www.youtube.com/embed/yvX8N4J6P8Q",
            description: "Step-by-step tutorial for drawing a cute cat."
        },
        {
            title: "Interesting Facts About Cats",
            video: "https://www.youtube.com/embed/sP4NMoJcFd4",
            description: "Learn fun facts about cats."
        }
    ],

    Dog: [
        {
            title: "How to Draw a Dog",
            video: "https://www.youtube.com/embed/6OcTkq3hRGA",
            description: "Easy dog drawing tutorial."
        },
        {
            title: "All About Dogs",
            video: "https://www.youtube.com/embed/V4LnorVVxfw",
            description: "Learn about different dog breeds."
        }
    ],

    Car: [
        {
            title: "How to Draw a Car",
            video: "https://www.youtube.com/embed/rA5dQfA8j6Q",
            description: "Simple car drawing tutorial."
        },
        {
            title: "How Cars Work",
            video: "https://www.youtube.com/embed/ZQvfHyfgBtA",
            description: "Basic explanation of how cars work."
        }
    ],

    Tree: [
        {
            title: "How to Draw a Tree",
            video: "https://www.youtube.com/embed/T5dJ8L3M1JQ",
            description: "Draw realistic trees easily."
        },
        {
            title: "Importance of Trees",
            video: "https://www.youtube.com/embed/Un2yBgIAxYs",
            description: "Learn why trees are essential."
        }
    ],

    Flower: [
        {
            title: "How to Draw a Flower",
            video: "https://www.youtube.com/embed/qQJv1L5n6-Q",
            description: "Easy flower drawing lesson."
        },
        {
            title: "Parts of a Flower",
            video: "https://www.youtube.com/embed/m6xM8W0Wg8Y",
            description: "Educational flower video."
        }
    ],

    Bird: [
        {
            title: "How to Draw a Bird",
            video: "https://www.youtube.com/embed/Om6vXhzLQvQ",
            description: "Draw a beautiful bird."
        },
        {
            title: "Birds for Kids",
            video: "https://www.youtube.com/embed/FH4J7TH4R1Q",
            description: "Learn about birds."
        }
    ],

    Fish: [
        {
            title: "How to Draw a Fish",
            video: "https://www.youtube.com/embed/P0Q6t5lPj4Q",
            description: "Easy fish drawing."
        },
        {
            title: "Marine Life",
            video: "https://www.youtube.com/embed/r9PeYPHdpNo",
            description: "Discover underwater animals."
        }
    ],

    Apple: [
        {
            title: "How to Draw an Apple",
            video: "https://www.youtube.com/embed/QJQ5j0e0sP8",
            description: "Simple apple drawing."
        },
        {
            title: "Health Benefits of Apples",
            video: "https://www.youtube.com/embed/K4TOrB7at0Y",
            description: "Why apples are healthy."
        }
    ],

    House: [
        {
            title: "How to Draw a House",
            video: "https://www.youtube.com/embed/CKjXvK5eQXE",
            description: "Easy house drawing tutorial."
        },
        {
            title: "Types of Houses",
            video: "https://www.youtube.com/embed/9kQEdz2b2vA",
            description: "Learn about different homes."
        }
    ],

    Bicycle: [
        {
            title: "How to Draw a Bicycle",
            video: "https://www.youtube.com/embed/IjB2M9Ek4mA",
            description: "Draw a bicycle step-by-step."
        },
        {
            title: "How a Bicycle Works",
            video: "https://www.youtube.com/embed/5R6Xk0nGm4A",
            description: "Understand bicycle mechanics."
        }
    ]

};

// ------------------------------------------------------
// Default Videos
// ------------------------------------------------------

const defaultVideos = [
    {
        title: "Basic Drawing Tutorial",
        video: "https://www.youtube.com/embed/ewMksAbgdBI",
        description: "Learn the basics of drawing."
    }
];

// ------------------------------------------------------
// Display Videos
// ------------------------------------------------------

function loadVideos() {

    if (!videoContainer) return;

    videoContainer.innerHTML = "";

    const videos =
        videoLibrary[topic] || defaultVideos;

    videos.forEach(item => {

        const card = document.createElement("div");

        card.className = "video-card";

        card.innerHTML = `

            <iframe
                src="${item.video}"
                allowfullscreen>
            </iframe>

            <div class="video-content">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

                <br>

                <a href="${item.video.replace("/embed/", "/watch?v=")}"
                   target="_blank"
                   class="btn primary">
                    Watch on YouTube
                </a>

            </div>

        `;

        videoContainer.appendChild(card);

    });

}

// ------------------------------------------------------
// Initialize
// ------------------------------------------------------

window.onload = function () {

    loadVideos();

};

// ------------------------------------------------------
// Console
// ------------------------------------------------------

console.log("AuraDraw Videos Loaded");
console.log("Topic:", topic);
