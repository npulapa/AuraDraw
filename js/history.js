// ======================================================
// AuraDraw - history.js
// Manages Drawing History using LocalStorage
// ======================================================

// ------------------------------------------------------
// Get Elements
// ------------------------------------------------------

const historyContainer = document.getElementById("historyContainer");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const searchInput = document.getElementById("searchInput");

// ------------------------------------------------------
// Load History
// ------------------------------------------------------

function loadHistory(filter = "") {

    if (!historyContainer) return;

    historyContainer.innerHTML = "";

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    if (filter !== "") {

        history = history.filter(item =>
            item.prediction
                .toLowerCase()
                .includes(filter.toLowerCase())
        );

    }

    if (history.length === 0) {

        historyContainer.innerHTML = `
            <div class="empty">
                <h2>No Drawing History Found</h2>
            </div>
        `;

        return;
    }

    history.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "history-card";

        card.innerHTML = `

            <img src="${item.image}" alt="Drawing">

            <div class="history-content">

                <h3>${item.prediction}</h3>

                <p><strong>Confidence:</strong> ${item.confidence}</p>

                <p class="history-date">${item.date}</p>

                <button class="delete-btn"
                        onclick="deleteHistory(${index})">
                    Delete
                </button>

            </div>

        `;

        historyContainer.appendChild(card);

    });

}

// ------------------------------------------------------
// Delete One Item
// ------------------------------------------------------

function deleteHistory(index) {

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.splice(index, 1);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    loadHistory(searchInput ? searchInput.value : "");

}

// ------------------------------------------------------
// Clear All
// ------------------------------------------------------

if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener("click", function () {

        const confirmDelete =
            confirm("Clear entire drawing history?");

        if (confirmDelete) {

            localStorage.removeItem("history");

            loadHistory();

        }

    });

}

// ------------------------------------------------------
// Search
// ------------------------------------------------------

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        loadHistory(this.value);

    });

}

// ------------------------------------------------------
// Open Image
// ------------------------------------------------------

historyContainer?.addEventListener("click", function (e) {

    if (e.target.tagName === "IMG") {

        const image = e.target.src;

        localStorage.setItem("drawingImage", image);

        window.open(image, "_blank");

    }

});

// ------------------------------------------------------
// Load Page
// ------------------------------------------------------

window.onload = function () {

    loadHistory();

};

// ------------------------------------------------------
// Console
// ------------------------------------------------------

console.log("AuraDraw History Loaded");
