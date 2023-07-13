let gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-to-color');
const eraserButton = document.querySelector('.btn-eraser');
const rainbowButton = document.querySelector('.btn-rainbow');
const colorpickerButton = document.querySelector('.btn-colorpicker');
const clearButton = document.querySelector('#erase-grid');
const toggleLines = document.querySelector('#toggle-lines');
const colorValue = document.querySelector('#color-value');
const colorPicker = document.querySelector('#colorPicker');
let color;
let size;
let cells;
let cell;

const changeBoxColor = (event) => {
  if (!event.shiftKey) {
    cell = event.target;
    if (color === 'rainbow') {
      const rainbowColor = setRainbowColor();
      cell.style.background = rainbowColor;
    }
    cell.style.background = color;
  }
};

const createGrid = (size = 16) => {
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
      cell.style.background = 'white';
      cell.classList.add('cell-borders');
      color = 'rainbow';
      rainbowButton.focus();
      row.appendChild(cell);
      const sizeOutput = document.getElementById('grid-info');
      sizeOutput.textContent = `Size: ${size} x ${size}`;
    }
  }
  cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach((cell) => {
    cell.addEventListener('mouseenter', changeBoxColor);
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
  startButton.addEventListener('click', () => {
    do {
      size = Number(prompt('Enter a size for the grid between 10 and 100 '));
    } while (isNaN(size) || size < 10 || size > 100 || !Number.isInteger(size));
    createGrid(size);
  });

  eraserButton.addEventListener('click', () => {
    color = 'white';
  });

  rainbowButton.addEventListener('click', () => {
    color = 'rainbow';
  });

  colorpickerButton.addEventListener('click', (event) => {
    color = '#000000';
    colorPicker.click();
  });

  colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
    colorValue.textContent = '';
    colorText = document.createTextNode(e.target.value);
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
    const menuBtns = document.querySelectorAll('.menu-btn');
    const lastSelected = [...menuBtns].find((button) =>
      button.classList.value.includes(color)
    );
    if (lastSelected) {
      lastSelected.focus();
    }
  });

  toggleLines.addEventListener('click', () => {
    gridContainer.classList.toggle('new-grid');
    Array.from(cells).forEach((cell) => {
      cell.classList.toggle('cell-borders');
    });
    const menuBtns = document.querySelectorAll('.menu-btn');
    const lastSelected = [...menuBtns].find((button) =>
      button.classList.value.includes(color)
    );
    if (lastSelected) {
      lastSelected.focus();
    }
  });

  createGrid();
};

main();
