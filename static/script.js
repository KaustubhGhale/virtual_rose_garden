document.getElementById("plantRoseBtn").addEventListener("click", function() {
    fetch('/add_rose', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            const garden = document.getElementById("garden");
            let rose = document.createElement("div");
            rose.className = "rose";
            rose.innerHTML = "🌹";
            garden.appendChild(rose);
        });
});
