document.addEventListener("DOMContentLoaded", () => {
  const btnAddInputMakanan = document.getElementById("btn-add-input-makanan");
  const containerInputMakanan = document.getElementById("container-input-makanan");
  const btnAddInputAktifitas = document.getElementById("btn-add-input-aktifitas");
  const containerInputAktifitas = document.getElementById("container-input-aktifitas");

  btnAddInputMakanan.addEventListener("click", () => {
    const newInput = document.createElement("div");
    newInput.classList.add("contrainer-input", "inner-input-makanan");
    newInput.innerHTML = `
      <div>
        <label for="input-makanan">Makanan/Minuman</label><br />
        <select name="input-makanan" class="input-makanan">
          <option value="" disabled selected hidden>Please Choose...</option>
          <option value="bakso">bakso</option>
        </select>
      </div>
      <input type="number" name="porsi" class="porsi" min="0" placeholder="Porsi" required/>
    `;
    containerInputMakanan.appendChild(newInput);
    addRemoveButtonListener(newInput);
  });

  btnAddInputAktifitas.addEventListener("click", () => {
    const newInput = document.createElement("div");
    newInput.classList.add("contrainer-input", "inner-input-aktifitas");
    newInput.innerHTML = `
      <div>
        <label for="input-aktifitas">Aktifitas</label><br />
        <select name="input-aktifitas" class="input-aktifitas" required>
          <option value="" disabled selected hidden>Please Choose...</option>
          <option value="push-up">push up</option>
        </select>
      </div>
      <input type="number" name="menit" class="menit" min="0" placeholder="Menit" required/>
    `;
    containerInputAktifitas.appendChild(newInput);
    addRemoveButtonListener(newInput);
  });

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Placeholder calorie data
    const calorieData = {
      makanan: {
        "bakso": 150 // calories per portion
      },
      olahraga: {
        "push-up": 5 // calories burned per minute
      }
    };

    let totalCalories = 0;

    // Calculate food calories
    document.querySelectorAll("#container-input-makanan .input-makanan").forEach((select, index) => {
      const makanan = select.value;
      const porsi = parseInt(document.querySelectorAll("#container-input-makanan .porsi")[index].value);
      if (makanan && porsi > 0) {
        totalCalories += (calorieData.makanan[makanan] || 0) * porsi;
      }
    });

    // Calculate activity calories burned
    document.querySelectorAll("#container-input-aktifitas .input-aktifitas").forEach((select, index) => {
      const olahraga = select.value;
      const menit = parseInt(document.querySelectorAll("#container-input-aktifitas .menit")[index].value);
      if (olahraga && menit > 0) {
        totalCalories -= (calorieData.olahraga[olahraga] || 0) * menit;
      }
    });

    alert(`Total calories: ${totalCalories}`);
  });

  function addRemoveButtonListener(container) {
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("btn-remove");
    removeButton.textContent = "⛔"; // Stop symbol (square)
    
    // Mengatur posisi simbol remove di sebelah kiri
    const inputContainer = container.querySelector("div");
    inputContainer.insertBefore(removeButton, inputContainer.firstChild);

    removeButton.addEventListener("click", () => {
      container.remove();
    });
  }
});
