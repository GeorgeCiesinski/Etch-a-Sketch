// Get Elements
const grid = document.querySelector("#grid");  // Grid parent div
const gridSelector = document.querySelector("#grid-slider");  // Get grid size slider
const btnResize = document.querySelector("#resize");  // Clear and resize button
const newGridLabel = document.querySelector("#new-grid-label");  // Labels and size preview
const newGridPreview = document.querySelector("#new-grid");
const currentGridPreview = document.querySelector("#current-grid");
let toolColor = document.querySelector("#color-tool");  // Color Pickers
let bgColor = document.querySelector("#color-background");

// Event Listeners
gridSelector.addEventListener("input", resizePreview);
btnResize.addEventListener("click", createGrid);

let newSize = 16;  // New Grid size for resize

function resizePreview(value) {
    newSize = this.value;
    newGridLabel.textContent = "New Grid Size:";
    newGridPreview.textContent = newSize + " x " + newSize;
}

function createGrid(){
    console.log("Created new grid");
    console.log(newSize);

    grid.replaceChildren(); // Removes any child nodes

    // Create Rows
    for (let i = 1; i <= newSize; i++) {
        const row = document.createElement('div');
        // Create Columns
        for (let j = 1; j <= newSize; j++) {
            const column = document.createElement('div');
            row.appendChild(column);
        }
        grid.appendChild(row);
    }

    currentGridPreview.textContent = newSize + " x " + newSize;  // Update Current Grid Size
    newGridLabel.textContent = "";  // Hide New Grid Size info
    newGridPreview.textContent = "";
}



createGrid();