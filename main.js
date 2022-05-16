// global param
let matrixSize = 9;
let groupSize = 3;

// init matrix
let matrix = new Array(matrixSize);
for (let i = 0; i < matrixSize; i++) {
  matrix[i] = new Array(matrixSize);
  for (let j = 0; j < matrixSize; j++) {
    matrix[i][j] = -1;
  }
}

const validCell = (row, column, value) => {
  console.log(`validCell(${row}, ${column}, ${value})`);
  for (let i = 0; i < matrixSize; i++) {
    if (matrix[row][i] === value) return false;
  }
  for (let i = 0; i < matrixSize; i++) {
    if (matrix[i][column] === value) return false;
  }
  for (let i = (row / groupSize) * groupSize + 0; i < (row / groupSize) * groupSize + groupSize; i++) {
    for (let j = 0; j < groupSize; j++) {
      if (matrix[i][j] === value) return false;
    }
  }
  return true;
}

const populateCell = (row, column) => {
  if (matrix[row][column] !== -1) {
    return matrix[row][column];
  } else {
    while (matrix[row][column] === -1) {
      setTimeout(() => {
      }, 5000);
      let num = Math.floor(Math.random() * 9 + 1);
      console.log('num: %d', num);
      if (validCell(row, column, num)) {
        matrix[row][column] = num;
      }
    }
    return matrix[row][column];
  }
}

const renderMatrix = () => {
  let a = '';

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // setTimeout(() => {
      //   populateCell(i, j);
      // }, 5000);
      a += matrix[i][j] + ' ';
      document.querySelector('#entry').innerHTML = a;
    }
    a += '<br>'
  }
}

document.addEventListener('DOMContentLoaded', (evt) => {
  renderMatrix();
})