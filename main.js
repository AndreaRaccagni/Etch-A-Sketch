let gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-game');
const eraserButton = document.querySelector('.btn-eraser');
const blackButton = document.querySelector('.btn-black');
const rainbowButton = document.querySelector('.btn-rainbow');
const clearButton = document.querySelector('#erase-grid');
let color = 'black';
let size = 0;
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
  gridContainer.textContent = '';
  gridContainer.classList.add('new-grid');
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList = 'row';
    gridContainer.appendChild(row);
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList = 'cell';
      cell.style.background = 'white';
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
    } while (isNaN(size) || size < 10 || size > 100);
    createGrid(size);
  });

  eraserButton.addEventListener('click', () => {
    color = 'white';
  });

  blackButton.addEventListener('click', () => {
    color = 'black';
  });

  rainbowButton.addEventListener('click', () => {
    color = 'rainbow';
  });

  clearButton.addEventListener('click', () => {
    Array.from(cells).forEach((cell) => {
      cell.style.background = 'white';
    });
  });

  createGrid();
};

main();
