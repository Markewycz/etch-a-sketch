const container = document.querySelector(".sketch-container");
const div = document.createElement("div");
const btnChangeGrid = document.querySelector(".change-grid");
let gridCellsPrompt = 16;

// Generate grid
const calcGrid = () => gridCellsPrompt * gridCellsPrompt;
let sketch;

const generateGrid = () => {
  for (let i = 0; i < calcGrid(); i++) {
    const div = document.createElement("div");
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
  console.log(gridCellsPrompt);
  clearGrid();
  generateGrid();
  sketchMode();
});
