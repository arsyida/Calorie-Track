document.addEventListener('DOMContentLoaded', async () => {
  const btnAddInputMakanan = document.getElementById('btn-add-input-makanan');
  const btnAddInputAktifitas = document.getElementById('btn-add-input-aktifitas');
  const inputMakan = document.getElementById('container-input-makanan');
  const inputAktifitas = document.getElementById('container-input-aktifitas');

  const dataActivity = await fetchData('https://api-calorietrack.vercel.app/Activity');
  const dataFood = await fetchData('https://api-calorietrack.vercel.app/Food');

  inputMakan.getElementsByClassName('input-makanan')[0].innerHTML = `<option value="" disabled selected hidden>Please Choose...</option>${generateOptions("makanan", dataFood)}`
  inputAktifitas.getElementsByClassName('input-aktifitas')[0].innerHTML = `<option value="" disabled selected hidden>Please Choose...</option>${generateOptions("aktifitas", dataActivity)}`

  btnAddInputMakanan.addEventListener('click', () => addInput(inputMakan, 'makanan', dataFood));
  btnAddInputAktifitas.addEventListener('click', () => addInput(inputAktifitas, 'aktifitas', dataActivity));

  const formInput = document.getElementById('form-input');
  formInput.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = [];
    const inputFoods = document.querySelectorAll('.inner-input-makanan');
    const inputActivities = document.querySelectorAll('.inner-input-aktifitas');

    processInputs(inputFoods, 'makanan', 'porsi', data);
    processInputs(inputActivities, 'aktifitas', 'menit', data);

    const kaloriDikonsumsi = document.getElementById('output-calori-consumed');
    const karbohidrat = document.getElementById('output-carbohydrate');
    const lemak = document.getElementById('output-fat');
    const protein = document.getElementById('output-protein');
    const serat = document.getElementById('output-fiber');
    const kolestrol = document.getElementById('output-cholesterols');
    const kaloriDibakar = document.getElementById('output-calories-burned');
    const kaloriTotal = document.getElementById('output-total-calories');

    kaloriDikonsumsi.textContent = calculateFood(data, dataFood, 'caloriesConsumed');
    karbohidrat.textContent = calculateFood(data, dataFood, 'carbo');
    lemak.textContent = calculateFood(data, dataFood, 'fat');
    protein.textContent = calculateFood(data, dataFood, 'protein');
    serat.textContent = calculateFood(data, dataFood, 'fiber');
    kolestrol.textContent = calculateFood(data, dataFood, 'cholesterol');
    kaloriDibakar.textContent = calculateActivity(data, dataActivity, 'burned');
    kaloriTotal.textContent = calculateFood(data, dataFood, 'caloriesConsumed') - calculateActivity(data, dataActivity);

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

function calculateFood(data, dataFood, type) {
  let total = 0;
  data.forEach(item => {
    if (item.type === 'makanan') {
      const matchedFood = findMatchedItem(item.name, dataFood);
      if (matchedFood) {
        if (type === 'caloriesConsumed') {
          const caloriesConsumed = parseFloat(item.portion) * matchedFood.calories;
          total += caloriesConsumed;
        } else if (type === 'carbo') {
          const carbo = parseFloat(item.portion) * matchedFood.carbohydrates;
          total += carbo;
        } else if (type === 'fat') {
          const fat = parseFloat(item.portion) * matchedFood.fat;
          total += fat;
        } else if (type === 'protein') {
          const protein = parseFloat(item.portion) * matchedFood.protein;
          total += protein;
        } else if (type === 'fiber') {
          const fiber = parseFloat(item.portion) * matchedFood.fiber;
          total += fiber;
        } else if (type === 'cholesterol') {
          const cholesterol = parseFloat(item.portion) * matchedFood.cholesterol;
          total += cholesterol;
        }
      }
    }
  });
  return total;
}

function calculateActivity(data, dataActivity) {
  let total = 0;
  data.forEach(item=>{
    const matchedActivity = findMatchedItem(item.name, dataActivity);
    if (matchedActivity) {
      const burned = parseFloat(item.minute) * matchedActivity.calories_burned_per_minute;
      total += burned;
    }
  })
  return total
}

function findMatchedItem(name, items) {
  return items.find(item => item.name === name);
}

function addInput(containerElement, inputType, data) {
  const newInputDiv = document.createElement('div');
  newInputDiv.classList.add('container-input');
  newInputDiv.classList.add(`inner-input-${inputType}`);

  const satuan = (inputType === 'makanan') ? 'porsi' : 'menit';

  newInputDiv.innerHTML = `
    <div class="btn-remove">
      <img src="./images/Remove.png" alt="Remove" class="remove-icon">
    </div>
    <select name="input-${inputType}" class="input-${inputType}" required>
      <option value="" disabled selected hidden>Please Choose...</option>
      ${generateOptions(inputType, data)}
    </select>
    <input type="number" name="${satuan}" class="${satuan}" min="0" placeholder="${satuan}" required>
  `;

  containerElement.appendChild(newInputDiv);
}

function generateOptions(inputType, data) {
  return data.map(item => {
    const label = (inputType === 'makanan')
      ? `${item.name} -- ${item.calories} cal`
      : `${item.name} -- ${item.calories_burned_per_minute} cal/mnt`;

    return `<option value="${item.name}">${label}</option>`;
  }).join('');
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

document.addEventListener('click', event => {
  if (event.target.classList.contains('remove-icon')) {
    const containerElement = event.target.closest('.container-input');
    containerElement.remove();
  }
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('btn-reset')) {
    location.reload()
  }
});