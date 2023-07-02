let gridContainer = document.getElementById('grid-container');
const button = document.getElementById('start-game');
let size = 0;
button.addEventListener('click', () => {
  do {
    size = Number(
      prompt('Choose your grid size.\nSize must be between 10 and 100 ')
    );
  } while (size < 10 || size > 100);

  const para = document.getElementById('grid-size');
  para.textContent = `Size: ${size} * ${size}`;
  createGrid(size);
});

const changeBoxColor = (element) => {
  element.addEventListener('mouseenter', (e) => {
    e.target.classList.add('color');
  });
};

const createGrid = (size) => {
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
      changeBoxColor(cell);
    }
  }
};
