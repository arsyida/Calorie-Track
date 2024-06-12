document.addEventListener("DOMContentLoaded", () => {
    const btnAddInputMakanan = document.getElementById("btn-add-input-makanan");
    const containerInputMakanan = document.getElementById("container-input-makanan");
    const btnAddInputAktifitas = document.getElementById("btn-add-input-aktifitas");
    const containerInputAktifitas = document.getElementById("container-input-aktifitas");

    btnAddInputMakanan.addEventListener("click", () => {
        const newInput = document.createElement("div");
        newInput.classList.add("contrainer-input", "inner-input-makanan");
        
        newInput.innerHTML = `
            <div class="btn-remove">
            <img src="./assets/Remove.png" alt="Remove" class="remove-icon">
            </div>
            <select name="input-makanan" class="input-makanan" required>
            <option value="" disabled selected hidden>Please Choose...</option>
            <option value="push-up">push up</option>
            </select>
            <input type="number" name="porsi" class="porsi" min="0" placeholder="porsi" required>
        `;
        containerInputMakanan.appendChild(newInput);
        addRemoveButtonListener(newInput);
    });

    btnAddInputAktifitas.addEventListener("click", () => {
        const newInput = document.createElement("div");
        newInput.classList.add("contrainer-input", "inner-input-aktifitas");
        
        newInput.innerHTML = `
            <div class="btn-remove">
            <img src="./assets/Remove.png" alt="Remove" class="remove-icon">
            </div>
            <select name="input-aktifitas" class="input-aktivitas" required>
            <option value="" disabled selected hidden>Please Choose...</option>
            <option value="push-up">push up</option>
            </select>
            <input type="number" name="menit" class="menit" min="0" placeholder="menit" required>
        `;
        containerInputAktifitas.appendChild(newInput);
        addRemoveButtonListener(newInput);
    });
    });

    function addRemoveButtonListener(container) {
        const removeButton = container.querySelector(".btn-remove");
        removeButton.addEventListener("click", () => {
            container.remove();
        });
    }
  // Reset button
document.addEventListener('click', event => {
  if (event.target.classList.contains('btn-reset')) {
    location.reload()
  }
});