import { colors } from "./enums";

const generateUniqueRandomArray = (n) => {
    var uniqueRandomArray = new Set();
    while (uniqueRandomArray.size < n) {
        var randomNumber = Math.floor(Math.random() * (n + 1));
        uniqueRandomArray.add(randomNumber);
    }
    return Array.from(uniqueRandomArray);
}
const createMatrix = (n) => {
    let matrix = [];
    // create a n*n matrix with numbers from 1 to n*n
    let k = 0;
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push({ id: k++, row: i, col: j });
        }
        matrix.push(row);
    }
    return matrix
}
const assignColour = (matrix) => {
    const n = matrix.length;
    let randomArray = generateUniqueRandomArray((n * n) / 2);
    let randomColours = randomArray.map(x => colors[x].name);
    let k = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = { ...matrix[i][j], color: randomColours[Math.floor(k / 2)], flipped: false, matched: false }
            k++;
        }
    }
    return matrix
}

const rotateRow = (matrix, rowIndex, shiftBy) => {
    const row = matrix[rowIndex];
    const length = row.length;
    shiftBy = shiftBy % length; // Ensure shiftBy is within the length of the row

    // If shiftBy is negative, convert it to positive
    if (shiftBy < 0) {
        shiftBy = length + shiftBy;
    }

    // Rotate the row to the right
    const rotatedRow = [...row.slice(length - shiftBy), ...row.slice(0, length - shiftBy)];

    // Update the matrix with the rotated row
    matrix[rowIndex] = rotatedRow;

    return matrix;
}
const rotateColumn = (matrix, colIndex, shiftBy) => {
    const numRows = matrix.length;
    const length = matrix[0].length;
    shiftBy = shiftBy % numRows; // Ensure shiftBy is within the number of rows

    // If shiftBy is negative, convert it to positive
    if (shiftBy < 0) {
        shiftBy = numRows + shiftBy;
    }

    // Extract the column to rotate
    const column = [];
    for (let i = 0; i < numRows; i++) {
        column.push(matrix[i][colIndex]);
    }

    // Rotate the column downwards
    const rotatedColumn = [...column.slice(length - shiftBy), ...column.slice(0, length - shiftBy)];

    // Update the matrix with the rotated column
    for (let i = 0; i < numRows; i++) {
        matrix[i][colIndex] = rotatedColumn[i];
    }

    return matrix;
}
const shuffleMatrix = (matrix, n) => {
    for (let i = 0; i < matrix.length; i++) {
        const j = Math.floor(Math.random() * (n + 1));
        matrix = rotateRow(matrix, i, j)
        matrix = rotateColumn(matrix, i, j)
    }
    return matrix
}

const checkLevelWin = (matrix)=>{
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if(matrix[i][j].matched === false){
                return false
            }
        }
    }
    return true
}

const createGameBoard = (n) => {
    let matrix = createMatrix(n);
    let coloredMatrix = assignColour(matrix);
    // shuffle matrix
    return shuffleMatrix(coloredMatrix, n)
    // return coloredMatrix
}

export { createGameBoard, checkLevelWin }