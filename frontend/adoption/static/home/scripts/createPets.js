document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded, fetching pets...");

  // Fetch existing pets when the document is loaded
  fetchPets();

  // Add event listener for form submission to create a new pet
  const form = document.getElementById("add-pet-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Construct the request body from form data
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries()); // Convert FormData to plain object
    body.isAdopted = false; // Automatically set to false

    try {
      // Send a POST request to create a new pet
      const response = await fetch("http://localhost:4000/api/v1/pets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create pet");
      }

      console.log("New pet created successfully:", data);
      document.getElementById("message").innerText =
        "Pet created successfully!";
      document.getElementById("message").style.color = "green";

      // Clear the form fields
      form.reset();

      // Fetch pets again to update the list with the newly added pet
      fetchPets();
    } catch (error) {
      console.error("Error creating pet:", error);
      document.getElementById("message").innerText = `Error: ${error.message}`;
      document.getElementById("message").style.color = "red";
    }
  });
});

async function fetchPets() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/pets/");
    const pets = await response.json();
    console.log("Fetched pets:", pets);

    // Display the pets in the HTML
    // (Implementation for displaying pets can be added here)
  } catch (error) {
    console.error("Error fetching pets:", error);
  }
}
