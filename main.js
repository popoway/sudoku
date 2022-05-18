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

/**
 * Checks if a value will be valid if filled in specified cell.
 * @param {number} row Row of the specified cell.
 * @param {number} column Column of the specified cell.
 * @param {number} value Value to be filled in the specified cell.
 * @returns {boolean} `true` if the cell will be valid, `false` if the cell will be invalid.
 */
const validCell = (row, column, value) => {
  console.debug('validCell(%d, %d, %d) invoked', row, column, value);
  for (let i = 0; i < matrixSize; i++) {
    if (matrix[row][i] === value) {
      console.debug('validCell(%d, %d, %d) returns false', row, column, value);
      return false;
    }
  }
  for (let i = 0; i < matrixSize; i++) {
    if (matrix[i][column] === value) {
      console.debug('validCell(%d, %d, %d) returns false', row, column, value);
      return false;
    }
  }
  for (let i = (Math.floor(row / groupSize)) * groupSize + 0; i < (Math.floor(row / groupSize)) * groupSize + groupSize; i++) {
    for (let j = (Math.floor(column / groupSize)) * groupSize + 0; j < (Math.floor(column / groupSize)) * groupSize + groupSize; j++) {
      // console.debug(row, column, i, j, matrix[i][j], " ", value);
      if (matrix[i][j] === value) {
        console.debug('validCell(%d, %d, %d) returns false', row, column, value);
        return false;
      }
    }
  }
  console.debug('validCell(%d, %d, %d) returns true', row, column, value);
  return true;
}

const validMatrix = () => {
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (!validCell(i, j, getCell(i, j))) return false;
    }
  }
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

/**
 * Populate the specified cell with a valid value.
 * @param {*} row 
 * @param {*} column 
 * @param {boolean} random By default, values are attempted sequentially from 0; if `true`, any valid value may be used randomly to populate.
 * @returns The populated value, or `-1` if no possible valid value can be populated.
 */
const populateCell = (row, column, random) => {
  console.debug('populateCell(%d, %d, %d) invoked', row, column, random);
  if (!(random === true)) {
    for (let i = 0; i < matrixSize; i++) {
      if (validCell(row, column, i)) {
        return setCell(row, column, i);
      }
    }
    return -1;
  } else {
    let values = new Set();
    while (values.size < matrixSize) {
      let num = Math.floor(Math.random() * 9 + 1);
      if (values.has(num)) continue;
      values.add(num);
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
    if (i == 9) break;
    for (let j = 0; j < matrixSize; j++) {
      if (i == 8 && j == 1) break;
      setTimeout(() => {
        populateCell(i, j, true);
      }, 500);
    }
  }
})