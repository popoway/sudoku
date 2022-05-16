// global param
let matrixSize = 9;
let groupSize = 3;
let validCellFlag = false;

// init matrix
let matrix = new Array(matrixSize);
for (let i = 0; i < matrixSize; i++) {
  matrix[i] = new Array(matrixSize);
  for (let j = 0; j < matrixSize; j++) {
    matrix[i][j] = -1;
  }
}

const validCell = (row, column, value) => {
  while (validCellFlag);
  validCellFlag = true;
  console.debug('validCell(%d, %d, %d) invoked', row, column, value);
  for (let i = 0; i < matrixSize; i++) {
    if (matrix[row][i] === value) {
      console.debug('validCell(%d, %d, %d) returns false', row, column, value);
      validCellFlag = false;
      return false;
    }
  }
  for (let i = 0; i < matrixSize; i++) {
    if (matrix[i][column] === value) {
      console.debug('validCell(%d, %d, %d) returns false', row, column, value);
      validCellFlag = false;
      return false;
    }
  }
  for (let i = (row / groupSize) * groupSize + 0; i < (row / groupSize) * groupSize + groupSize; i++) {
    for (let j = (row / groupSize) * groupSize + 0; j < (row / groupSize) * groupSize + groupSize; j++) {
      if (matrix[i][j] === value) {
        console.debug('validCell(%d, %d, %d) returns false', row, column, value);
        validCellFlag = false;
        return false;
      }
    }
  }
  console.debug('validCell(%d, %d, %d) returns true', row, column, value);
  validCellFlag = false;
  return true;
}

const setCell = (row, column, value) => {
  console.debug('setCell(%d, %d, %d) invoked', row, column, value);
  matrix[row][column] = value;
  renderMatrix();
}

const getCell = (row, column) => {
  console.debug('getCell(%d, %d) invoked', row, column);
  return matrix[row][column];
  renderMatrix();
}

const populateCell = (row, column) => {
  console.debug('populateCell(%d, %d) invoked', row, column);
  if (matrix[row][column] !== -1) {
    return matrix[row][column];
  } else {
    while (matrix[row][column] === -1) {
      let num = Math.floor(Math.random() * 9 + 1);
      console.debug('Pick random num: %d', num);
      if (validCell(row, column, num)) {
        return setCell(row, column, num);
      }
    }
  }
}

const renderMatrix = () => {
  console.debug('renderMatrix() invoked');
  let a = '';

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      a += matrix[i][j] + ' ';
      document.querySelector('#entry').innerHTML = a;
    }
    a += '<br>'
  }
}

document.addEventListener('DOMContentLoaded', (evt) => {
  console.debug('matrixSize: %d', matrixSize);
  console.debug('groupSize: %d', groupSize);
  renderMatrix();
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      setTimeout(() => {
        if (i <= 4) {
          populateCell(i, j);

        }
      }, 100);
    }
  }
})