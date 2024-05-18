document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded, fetching pets...");

  fetch("http://localhost:4000/api/v1/pets")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Response received:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      const petList = document.getElementById("pet-list");

      // Clear any existing content in the pet-list
      petList.innerHTML = "";

      // Check if data is not empty
      if (data.length === 0) {
        petList.innerHTML = "<p>No pets found.</p>";
        return;
      }

      data.forEach((pet) => {
        const petItem = document.createElement("div");
        petItem.innerHTML = `
          <h2>${pet.breed}</h2>
          <p>Gender: ${pet.gender}</p>
          <p>Age: ${pet.age}</p>
          <p>Description: ${pet.description}</p>
          <p>Adopted: ${pet.isAdopted ? "Yes" : "No"}</p>
        `;
        petList.appendChild(petItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching pets:", error);
      const petList = document.getElementById("pet-list");
      petList.innerHTML = `<p>Error fetching pets: ${error.message}</p>`;
    });
});

