const gridContainer = document.getElementById('grid-container');

const createGrid = (size = 16) => {
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList = 'row';
    gridContainer.appendChild(row);
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList = 'cell';
      row.appendChild(cell);
    }
  }
};

createGrid();

// const changeBoxColor = (element) => {
//   element.addEventListener(onmouseenter, () => {
//     console.log('hello');
//   });
// };
