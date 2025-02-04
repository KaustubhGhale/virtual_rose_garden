document.getElementById("plantRoseBtn").addEventListener("click", function() {
    // Fetching from Flask to add a new rose
    fetch('/add_rose', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            const garden = document.getElementById("garden");
            let rose = document.createElement("div");
            rose.className = "rose";
            rose.innerHTML = "🌹";

            // Append the rose to the garden
            garden.appendChild(rose);

            // Update the rose counter
            updateRoseCount(data.rose_count);  // Get the updated count from Flask response

            // Randomly create floating hearts
            createFloatingHearts();

            // If rose count reaches a certain number, show the surprise message
            if (data.rose_count >= 5) {  // Use rose_count from the server response
                showLoveLetter();
            }
        });
});

// Function to update the rose count
function updateRoseCount(roseCount) {
    const roseCountElement = document.getElementById("rose-count");
    roseCountElement.textContent = "Roses planted: " + roseCount;
}

// Function to create floating hearts
function createFloatingHearts() {
    const garden = document.getElementById("garden");
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    
    // Randomize the starting position of the heart
    heart.style.left = Math.random() * 100 + "%";
    
    // Append the heart to the garden
    garden.appendChild(heart);
    
    // Remove the heart after it has finished floating
    setTimeout(() => {
        garden.removeChild(heart);
    }, 3000);
}

// Function to show the love letter surprise after planting a certain number of roses
function showLoveLetter() {
    const loveLetter = document.getElementById("love-letter");
    loveLetter.style.display = "block";

    const surpriseBtn = document.getElementById("surprise-btn");
    surpriseBtn.style.display = "inline-block";

    surpriseBtn.addEventListener("click", function() {
        alert("💖 You are my everything! 💖");
        loveLetter.style.display = "none";
        surpriseBtn.style.display = "none";
    });
}
