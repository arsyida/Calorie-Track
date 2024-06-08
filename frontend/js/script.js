document.addEventListener("DOMContentLoaded", () => {
    // Add new food input fields
    document.getElementById("btn-add-input-makanan").addEventListener("click", () => {
      const container = document.getElementById("container-input-makanan");
  
      // Create a new div for the new set of inputs
      const newDiv = document.createElement("div");
  
      // Create the label and select for food
      const labelFood = document.createElement("label");
      labelFood.setAttribute("for", "input-makanan");
      labelFood.textContent = "Makanan/Minuman";
      newDiv.appendChild(labelFood);
      newDiv.appendChild(document.createElement("br"));
  
      const selectFood = document.createElement("select");
      selectFood.setAttribute("name", "input-makanan");
      selectFood.classList.add("input-makanan");
      selectFood.innerHTML = `
        <option value="" disabled selected hidden>Please Choose...</option>
        <option value="bakso">bakso</option>
      `;
      newDiv.appendChild(selectFood);
  
      // Create the input for portion
      const inputPortion = document.createElement("input");
      inputPortion.setAttribute("type", "number");
      inputPortion.setAttribute("name", "porsi");
      inputPortion.classList.add("porsi");
      inputPortion.setAttribute("min", "0");
      inputPortion.setAttribute("placeholder", "Porsi");
      newDiv.appendChild(inputPortion);
  
      // Append the new div to the container
      container.appendChild(newDiv);
    });
  
    // Add new activity input fields
    document.getElementById("btn-add-input-aktifitas").addEventListener("click", () => {
      const container = document.getElementById("container-input-aktifitas");
  
      // Create a new div for the new set of inputs
      const newDiv = document.createElement("div");
  
      // Create the label and select for activity
      const labelActivity = document.createElement("label");
      labelActivity.setAttribute("for", "input-olahraga");
      labelActivity.textContent = "Aktifitas";
      newDiv.appendChild(labelActivity);
      newDiv.appendChild(document.createElement("br"));
  
      const selectActivity = document.createElement("select");
      selectActivity.setAttribute("name", "input-olahraga");
      selectActivity.classList.add("input-olahraga");
      selectActivity.innerHTML = `
        <option value="" disabled selected hidden>Please Choose...</option>
        <option value="push-up">push up</option>
      `;
      newDiv.appendChild(selectActivity);
  
      // Create the input for minutes
      const inputMinutes = document.createElement("input");
      inputMinutes.setAttribute("type", "number");
      inputMinutes.setAttribute("name", "menit");
      inputMinutes.classList.add("menit");
      inputMinutes.setAttribute("min", "0");
      inputMinutes.setAttribute("placeholder", "Menit");
      newDiv.appendChild(inputMinutes);
  
      // Append the new div to the container
      container.appendChild(newDiv);
    });
  });
  