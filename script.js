const container = document.querySelector(".sketch-container");
const div = document.createElement("div");
const btnChangeGrid = document.querySelector(".change-grid");
let gridCellsPrompt = 16;
let sketch;

// FORMULA 960 / gridCellsPrompt = cell width/height px

// Generate grid
const calcGrid = () => gridCellsPrompt * gridCellsPrompt;
const calcCell = () => 960 / gridCellsPrompt;

const generateGrid = () => {
  for (let i = 0; i < calcGrid(); i++) {
    const div = document.createElement("div");
    div.style.width = calcCell() + "px";
    div.style.height = calcCell() + "px";
    container.appendChild(div).classList.add("sketch-cell");
  }
  sketch = document.querySelectorAll(".sketch-cell");
};
generateGrid();

// Clear existing grid
const clearGrid = () => {
  sketch.forEach((cell) => {
    cell.parentNode.removeChild(cell);
  });
};

// Sketching method
const sketchMode = () => {
  sketch.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      if (e.buttons === 1) cell.classList.add("painted");
    });
  });
};
sketchMode();

// Change grid cells per row
btnChangeGrid.addEventListener("click", () => {
  gridCellsPrompt = +prompt("How many cells per row you want?");
  if (gridCellsPrompt >= 100) return alert("Pick number up to 100!");
  clearGrid();
  generateGrid();
  sketchMode();
});
