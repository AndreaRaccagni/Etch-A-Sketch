let gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-to-color');
const sizeOutput = document.getElementById('grid-info');
const eraserButton = document.querySelector('.btn-eraser');
const rainbowButton = document.querySelector('.btn-rainbow');
const clearButton = document.querySelector('#erase-grid');
const toggleLines = document.querySelector('#toggle-lines');
const colorValue = document.querySelector('#color-value');
const colorpickerButton = document.querySelector('.btn-colorpicker');
const colorpickerInput = document.querySelector('#colorPicker');
const menuBtns = document.querySelectorAll('.menu-btn');
let cells = document.getElementsByClassName('cell');
let color;
let lastSelected;
let pickedColor = '#000000';

const changeBoxColor = (event) => {
  if (!event.shiftKey) {
    const cell = event.target;
    if (color === 'rainbow') {
      const rainbowColor = setRainbowColor();
      cell.style.background = rainbowColor;
    }
    cell.style.background = color;
  }
};

const setFocusOnButton = () => {
  const focused = [...menuBtns].find(
    (button) => button.classList.value === lastSelected
  );
  if (focused) {
    focused.focus();
  }
};

const createGrid = (size) => {
  gridContainer.classList.add('outer-borders');
  gridContainer.textContent = '';
  colorPicker.value = pickedColor;
  colorValue.textContent = pickedColor;
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList = 'row';
    gridContainer.appendChild(row);
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList = 'cell';
      cell.style.background = '#ffffff';
      cell.classList.add('cell-borders');
      row.appendChild(cell);
      color = 'rainbow';
      rainbowButton.focus();
      sizeOutput.textContent = `Size: ${size} x ${size}`;
    }
  }
  Array.from(cells).forEach((cell) => {
    cell.addEventListener('mouseenter', changeBoxColor);
  });
};

const promptForNewGrid = () => {
  startButton.addEventListener('click', () => {
    let size = prompt('Enter a size for the grid between 10 and 100');
    if (!size) {
      return;
    }
    size = Number(size);
    if (isNaN(size) || size < 10 || size > 100 || !Number.isInteger(size)) {
      alert('The input must be an integer between 10 and 100');
      return;
    }
    createGrid(size);
  });
};

const setRainbowColor = () => {
  const rainbowColors = [
    'violet',
    'indigo',
    'blue',
    'green',
    'yellow',
    'orange',
    'red',
  ];
  const index = Math.floor(Math.random() * 7);
  return rainbowColors[index];
};

const main = () => {
  eraserButton.addEventListener('click', (e) => {
    color = '#ffffff';
    lastSelected = e.target.classList.value;
  });

  rainbowButton.addEventListener('click', (e) => {
    color = 'rainbow';
    lastSelected = e.target.classList.value;
  });

  colorpickerButton.addEventListener('click', (e) => {
    color = pickedColor;
    lastSelected = e.target.classList.value;
  });

  colorpickerInput.addEventListener('input', (event) => {
    color = event.target.value;
    pickedColor = event.target.value;
    colorValue.textContent = '';
    const value = document.createTextNode(event.target.value);
    colorValue.appendChild(value);
  });

  clearButton.addEventListener('click', () => {
    Array.from(cells).forEach((cell) => {
      cell.style.background = '#ffffff';
      cell.style.transition = 'background 0.7s';
      setTimeout(function () {
        cell.style.transition = '';
      }, 700);
    });
    setFocusOnButton();
  });

  toggleLines.addEventListener('click', () => {
    gridContainer.classList.toggle('new-grid');
    Array.from(cells).forEach((cell) => {
      cell.classList.toggle('cell-borders');
    });
    setFocusOnButton();
  });

  promptForNewGrid();
  createGrid((size = 16));
};

main();
