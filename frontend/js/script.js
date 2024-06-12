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
