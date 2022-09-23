const grid = document.querySelector("#grid");  // Grid parent div

let currentSize = 16;  // Starting & current grid size
let newSize = 16;  // New Grid size for resize

const gridSelector = document.querySelector("#grid-slider");  // Get grid size slider

gridSelector.oninput = function() {
    gridSize = this.value;
    console.log(gridSize);
}

function createGrid(){
    grid.replaceChildren(); // Removes any child nodes

    // Create Rows
    for (let i = 1; i <= gridSize; i++) {
        const row = document.createElement('div');
        // Create Columns
        for (let j = 1; j <= gridSize; j++) {
            const column = document.createElement('div');
            column.textContent = j;
            row.appendChild(column);
        }
        grid.appendChild(row);
    }
}

createGrid();