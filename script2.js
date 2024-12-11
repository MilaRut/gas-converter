import { gasData } from "./data.js";

const selectedGas = document.querySelector('#gas-select');

const ppmOutput = document.querySelector('#ppm-output');
const mgm320Output = document.querySelector('#mgm3_20-output');
const mgm30Output = document.querySelector('#mgm3_0-output');
const percentOutput = document.querySelector('#percent-output');

const convertBtn = document.querySelector('#convert');
const resetBtn = document.querySelector('#reset');
const valueInput = document.querySelector('#value-input');

function convertGasValues() {
  const currentUnit = document.querySelector('input[name="unit"]:checked').id;
  const currentGas = selectedGas.value;
  if (currentGas === '') {
    alert('Выберите газ');
    return;
  }

  const currentData = gasData[currentGas];

  if (currentUnit === 'ppm') {
    ppmOutput.textContent = parseFloat(Number(valueInput.value).toFixed(4));
    mgm320Output.textContent = parseFloat((Number(valueInput.value) * Number(currentData.mgm3_20)).toFixed(4));
    mgm30Output.textContent = parseFloat((Number(valueInput.value) * Number(currentData.mgm3_0)).toFixed(4));
    percentOutput.textContent = parseFloat((Number(valueInput.value) * Number(currentData.percent)).toFixed(5));
  } else if (currentUnit === 'mgm3_20') {    
    ppmOutput.textContent = parseFloat(((Number(currentData.ppm) * Number(valueInput.value)) / Number(currentData.mgm3_20)).toFixed(4));
    mgm320Output.textContent = parseFloat(Number(valueInput.value).toFixed(4));
    mgm30Output.textContent = parseFloat(((Number(currentData.mgm3_0) * Number(valueInput.value)) / Number(currentData.mgm3_20)).toFixed(4));
    percentOutput.textContent = parseFloat(((Number(currentData.percent) * Number(valueInput.value)) / Number(currentData.mgm3_20)).toFixed(5));
  } else if (currentUnit === 'mgm3_0') {
    ppmOutput.textContent = parseFloat(((Number(currentData.ppm) * Number(valueInput.value)) / Number(currentData.mgm3_0)).toFixed(4));
    mgm320Output.textContent = parseFloat(((Number(currentData.mgm3_20) * Number(valueInput.value)) / Number(currentData.mgm3_0)).toFixed(4));
    mgm30Output.textContent = parseFloat(Number(valueInput.value).toFixed(4));
    percentOutput.textContent = parseFloat(((Number(currentData.percent) * Number(valueInput.value)) / Number(currentData.mgm3_0)).toFixed(5));
  } else if (currentUnit === 'percent') {
    ppmOutput.textContent = parseFloat(((Number(currentData.ppm) * Number(valueInput.value)) / Number(currentData.percent)).toFixed(4));
    mgm320Output.textContent = parseFloat(((Number(currentData.mgm3_20) * Number(valueInput.value)) / Number(currentData.percent)).toFixed(4));
    mgm30Output.textContent = parseFloat(((Number(currentData.mgm3_0) * Number(valueInput.value)) / Number(currentData.percent)).toFixed(4));
    percentOutput.textContent = parseFloat(Number(valueInput.value).toFixed(5));
  }
}

function resetConverter() {
  ppmOutput.textContent = '';
  mgm320Output.textContent = '';
  mgm30Output.textContent = '';
  percentOutput.textContent = '';
}

resetBtn.addEventListener('click', () => {
  selectedGas.options[0].style.display = 'block';
  selectedGas.options[0].selected = 'true';
  valueInput.value = '';
  resetConverter();
});

convertBtn.addEventListener('click', () => {
  convertGasValues();
});

selectedGas.addEventListener('change', () => {
  const defaultOption = selectedGas.options[0];
  if (selectedGas.value !== "") {
    defaultOption.style.display = 'none';
  } else {
    defaultOption.style.display = 'block';
  }
});