document.addEventListener("DOMContentLoaded", async () => {
  const btnAddInputMakanan = document.getElementById("btn-add-input-makanan");
  const btnAddInputAktifitas = document.getElementById("btn-add-input-aktifitas");
  const inputMakan = document.getElementById('container-input-makanan');
  const inputAktifitas = document.getElementById('container-input-aktifitas');

  const dataActivity = await fetchData('http://localhost:5000/Activity');
  const dataFood = await fetchData('http://localhost:5000/Food');

  inputMakan.getElementsByClassName('input-makanan')[0].innerHTML = `<option value="" disabled selected hidden>Please Choose...</option>${generateOptions("makanan", dataFood)}`
  inputAktifitas.getElementsByClassName('input-aktifitas')[0].innerHTML = `<option value="" disabled selected hidden>Please Choose...</option>${generateOptions("aktifitas", dataActivity)}`

  const formInput = document.getElementById('form-input');
  formInput.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = [];
    const inputFoods = document.querySelectorAll('.inner-input-makanan');
    const inputActivities = document.querySelectorAll('.inner-input-aktifitas');

    processInputs(inputFoods, 'makanan', 'porsi', data);
    processInputs(inputActivities, 'aktifitas', 'menit', data);
    });


  btnAddInputMakanan.addEventListener("click", () => {
    const newInput = document.createElement("div");
    newInput.classList.add("contrainer-input", "inner-input-makanan");

      newInput.innerHTML = `
          <div class="btn-remove">
          <img src="./assets/Remove.png" alt="Remove" class="remove-icon">
          </div>
           <select name="input-makanan" class="input-makanan" required>
            <option value="" disabled selected hidden>Please Choose...</option>
            ${generateOptions("makanan", data)}
            </select>
            <input type="number" name="porsi" class="porsi" min="0" placeholder="porsi" required>
        `;
        containerElement.appendChild(newInput);
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
          ${generateOptions("aktivitas", data)}
          </select>
          <input type="number" name="menit" class="menit" min="0" placeholder="menit" required>
      `;
      containerElement.appendChild(newInput);
  });
});

function processInputs(inputs, type, satuan, data) {
  inputs.forEach(input => {
    const name = input.querySelector(`.input-${type}`).value;
    const value = input.querySelector(`.${satuan}`).value;

    if (name && !isNaN(value)) {
      if (satuan === "porsi") {
        data.push({ type, name, portion: value });
      } else {
        data.push({ type, name, minute: value });
      }
    }
  });
}

function findMatchedItem(name, items) {
  return items.find(item => item.name === name);
}

function resetFields() {
    document.getElementById('foodQuantity1').value = 3;
    document.getElementById('foodQuantity2').value = 3;
    document.getElementById('activityDuration1').value = 30;
    document.getElementById('activityDuration2').value = 40;
    document.getElementById('totalCaloriesConsumed').innerText = 0;
    document.getElementById('totalCaloriesBurned').innerText = 0;
    document.getElementById('netCalories').innerText = 0;
}

function calculateCalories() {
    let foodCalories1 = parseInt(document.getElementById('foodSelect1').value) * parseInt(document.getElementById('foodQuantity1').value);
    let foodCalories2 = parseInt(document.getElementById('foodSelect2').value) * parseInt(document.getElementById('foodQuantity2').value);
    let totalCaloriesConsumed = foodCalories1 + foodCalories2;

    let activityCalories1 = parseFloat(document.getElementById('activitySelect1').value) * parseInt(document.getElementById('activityDuration1').value);
    let activityCalories2 = parseFloat(document.getElementById('activitySelect2').value) * parseInt(document.getElementById('activityDuration2').value);
    let totalCaloriesBurned = activityCalories1 + activityCalories2;

    let netCalories = totalCaloriesConsumed - totalCaloriesBurned;

    document.getElementById('totalCaloriesConsumed').innerText = totalCaloriesConsumed;
    document.getElementById('totalCaloriesBurned').innerText = totalCaloriesBurned;
    document.getElementById('netCalories').innerText = netCalories;
}

function generateOptions(inputType, data) {
  return data.map(item => {
    const label = (inputType === 'makanan')
      ? `${item.name} -- ${item.calories} cal`
      : `${item.name} -- ${item.calories_burned_per_minute} cal/mnt`;

    return `<option value="${item.name}">${label}</option>`;
  }).join('');
}

 // Function to fetch data from API and render it to the select element
 async function fetchData(apiUrl, selectElement) {
  await fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Assuming the API returns an array of objects with 'id' and 'name' properties
          data.forEach(item => {
              const option = document.createElement('option');
              option.value = item.id;
              option.textContent = item.name;
              selectElement.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

  document.addEventListener('click', event => {
    if (event.target.classList.contains('remove-icon')) {
      const containerElement = event.target.closest('.container-input');
      containerElement.remove();
    }
  });

// Reset button
document.addEventListener('click', event => {
if (event.target.classList.contains('btn-reset')) {
  location.reload()
}
});
