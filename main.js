let gridContainer = document.getElementById('grid-container');
const button = document.getElementById('start-game');
let size = 0;

button.addEventListener('click', () => {
  do {
    size = Number(prompt('Enter a size for the grid between 10 and 100 '));
  } while (isNaN(size) || size < 10 || size > 100);
  createGrid(size);
});

const changeBoxColor = (element) => {
  element.addEventListener('mouseenter', (e) => {
    if (!e.shiftKey) {
      e.target.classList.add('color');
    }
  });
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
      row.appendChild(cell);
      const sizeOutput = document.getElementById('grid-size');
      sizeOutput.textContent = `Size: ${size} * ${size}`;
      changeBoxColor(cell);
    }
  }
};

const setRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

createGrid();
