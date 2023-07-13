let gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-to-color');
const sizeOutput = document.getElementById('grid-info');
const eraserButton = document.querySelector('.btn-eraser');
const rainbowButton = document.querySelector('.btn-rainbow');
const colorpickerButton = document.querySelector('.btn-colorpicker');
const clearButton = document.querySelector('#erase-grid');
const toggleLines = document.querySelector('#toggle-lines');
const colorValue = document.querySelector('#color-value');
const colorPicker = document.querySelector('#colorPicker');
const menuBtns = document.querySelectorAll('.menu-btn');
let size = 16;
let color;
let cells;

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
  const lastSelected = [...menuBtns].find((button) =>
    button.classList.value.includes(color)
  );
  if (lastSelected) {
    lastSelected.focus();
  }
};

const createGrid = (size) => {
  gridContainer.classList.add('outer-borders');
  gridContainer.textContent = '';
  colorPicker.value = '#000000';
  colorValue.textContent = '#000000';
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
  cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach((cell) => {
    cell.addEventListener('mouseenter', changeBoxColor);
  });
};

const promptForNewGrid = () => {
  startButton.addEventListener('click', () => {
    size = prompt('Enter a size for the grid between 10 and 100');
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
  eraserButton.addEventListener('click', () => {
    color = '#ffffff';
  });

  rainbowButton.addEventListener('click', () => {
    color = 'rainbow';
  });

  colorpickerButton.addEventListener('click', () => {
    color = '#000000';
    colorPicker.click();
  });

  colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
    colorValue.textContent = '';
    colorText = document.createTextNode(event.target.value);
    colorValue.appendChild(colorText);
  });

  clearButton.addEventListener('click', () => {
    Array.from(cells).forEach((cell) => {
      cell.style.background = 'white';
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
  createGrid(size);
};

main();
