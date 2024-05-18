document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("update-pet-form").addEventListener("submit", function (event) {
      event.preventDefault();

      const petId = document.getElementById("update-pet-id").value.trim();
      const breed = document.getElementById("update-breed").value.trim();
      const gender = document.getElementById("update-gender").value.trim();
      const age = parseInt(document.getElementById("update-age").value.trim(), 10);
      const description = document.getElementById("update-description").value.trim();
      const isAdopted = document.getElementById("update-is-adopted").checked;

      const updatedPet = {
          breed,
          gender,
          age,
          description,
          isAdopted
      };

      fetch(`http://localhost:4000/api/v1/pets/update/${petId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedPet)
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then(error => { throw new Error(error.message || "Failed to update pet") });
          }
          return response.json();
      })
      .then(data => {
          const messageElement = document.getElementById("update-message");
          messageElement.textContent = `Pet updated successfully: ${JSON.stringify(data)}`;
          messageElement.style.color = "green";
          updatePetDetailsInDOM(data);
      })
      .catch(error => {
          const messageElement = document.getElementById("update-message");
          messageElement.textContent = `Error: ${error.message}`;
          messageElement.style.color = "red";
      });
  });
});

function updatePetDetailsInDOM(updatedPet) {
  const petElement = document.getElementById(`pet-${updatedPet._id}`);
  if (petElement) {
      petElement.querySelector(".pet-breed").textContent = `Breed: ${updatedPet.breed}`;
      petElement.querySelector(".pet-gender").textContent = `Gender: ${updatedPet.gender}`;
      petElement.querySelector(".pet-age").textContent = `Age: ${updatedPet.age}`;
      petElement.querySelector(".pet-description").textContent = `Description: ${updatedPet.description}`;
      petElement.querySelector(".pet-is-adopted").textContent = `Is Adopted: ${updatedPet.isAdopted ? "Yes" : "No"}`;
  }
}
