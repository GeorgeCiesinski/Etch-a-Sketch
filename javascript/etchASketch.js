// Get Elements
const grid = document.querySelector("#grid");  // Grid parent div
const gridSelector = document.querySelector("#grid-slider");  // Get grid size slider
const btnResize = document.querySelector("#resize");  // Clear and resize button
const newGridLabel = document.querySelector("#new-grid-label");  // Labels and size preview
const newGridPreview = document.querySelector("#new-grid");
const currentGridPreview = document.querySelector("#current-grid");
let toolColorEl = document.querySelector("#color-tool");  // Color Pickers
let bgColorEl = document.querySelector("#color-background");
const toolButtons = document.querySelectorAll(".tool-button");  // All tool buttons

// Global variables
let newSize = 16;  // New Grid size for resize
let toolColor = toolColorEl.value;  // Color for main tool
let bgColor = bgColorEl.value;  // Color for eraser and bg
let currentTool = "draw";  // "draw", "erase", "eyedrop"

// Event Listeners
gridSelector.addEventListener("input", resizePreview);
btnResize.addEventListener("click", createGrid);
toolColorEl.addEventListener("input", function() {  // Update toolColor if color selector input occurs
    toolColor = this.value;
});
bgColorEl.addEventListener("input", function() {  // Update bgColor if color selector input occurs
    bgColor = this.value;
    updateBackground(bgColor);
});
toolButtons.forEach(el => el.addEventListener("click", changeTool));

// Convert RGB to hex
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

// Determines which tool is selected and activates it
function useTool(element) {
    if (currentTool == "draw") {
        drawCell(element);
    }
    else if (currentTool == "erase") {
        eraseCell(element);
    } else {
        updateToolColor(element);
    }
}

// Draw tool
function drawCell(element) {
    element.setAttribute("background", false);
    element.style.backgroundColor = toolColor;
}

//Erase tool
function eraseCell(element) {
    element.setAttribute("background", true);
    element.style.backgroundColor = bgColor;
}

// Eyedropper tool
function updateToolColor(element) {
    elColor = rgb2hex(element.style.backgroundColor);
    toolColor = elColor;
    toolColorEl.value = toolColor;
}

// Updates all background cells to new color
function updateBackground(color) {
    const backgroundCells = document.querySelectorAll('[background="true"]');
    backgroundCells.forEach(cell => cell.style.backgroundColor = bgColor);
}

// Previews new size of grid
function resizePreview(value) {
    newSize = this.value;
    newGridLabel.textContent = "New Grid Size:";
    newGridPreview.textContent = newSize + " x " + newSize;
}

// Changes current tool
function changeTool() {
    currentTool = this.getAttribute("id");
    toolPreview();
    console.log(currentTool);
}
// Changes button styling for selected tool
function toolPreview() {
    toolButtons.forEach(el => el.classList.remove("selected-button"));
    document.querySelector("#"+currentTool).classList.add("selected-button");
}

// Creates a new grid
function createGrid(){
    grid.replaceChildren(); // Removes any child nodes

    // Create Rows
    for (let i = 1; i <= newSize; i++) {
        const row = document.createElement('div');
        // Create Columns by creating cells within the rows
        for (let j = 1; j <= newSize; j++) {
            const cell = document.createElement('div');
            cell.addEventListener("mousedown", function() {  // Add mousedown event when mouse isn't moved
                useTool(this);
            }); 
            cell.addEventListener("mousemove", checkMouseClicked);  // Add mousemove event to cells
            cell.setAttribute("background", true);  // New cells should have background attribute
            cell.style.backgroundColor = bgColor;  // Sets white background
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    currentGridPreview.textContent = newSize + " x " + newSize;  // Update Current Grid Size
    newGridLabel.textContent = "";  // Hide New Grid Size info
    newGridPreview.textContent = "";
}

// Checks if mouse button pressed while mouse moved over element
function checkMouseClicked(e) {
    if (e.buttons == 1) {
        useTool(this);
    }
}

// Initial grid creation
createGrid();