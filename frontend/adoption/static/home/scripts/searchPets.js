document.getElementById("search-button").addEventListener("click", function () {
  const breed = document.getElementById("breed-search").value;
  console.log(`Searching for breed: ${breed}`);

  fetch(`http://localhost:4000/api/v1/pets/breed/${breed}`)
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      const display = document.getElementById("search-display");
      display.innerHTML = "";

      if (data.length === 0) {
        display.innerHTML = "<p>No pets found.</p>";
      } else {
        data.forEach((pet) => {
          const petDiv = document.createElement("div");
          petDiv.className = "pet";
          petDiv.innerHTML = `
            <h3>${pet.breed}</h3>
            <p>Gender: ${pet.gender}</p>
            <p>Age: ${pet.age}</p>
            <p>Description: ${pet.description}</p>
            <p>Adopted: ${pet.isAdopted ? "Yes" : "No"}</p>
          `;
          display.appendChild(petDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching pets:", error);
      document.getElementById("search-display").innerHTML =
        "<p>Error fetching pets: " + error.message + "</p>";
    });
});
