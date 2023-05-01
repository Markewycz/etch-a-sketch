const container = document.querySelector(".sketch-container");
const div = document.createElement("div");
const btnChangeGrid = document.querySelector(".change-grid");
const black = document.querySelector("#radio-one");
const rainbow = document.querySelector("#radio-two");
let gridCellsPrompt = 16;
let sketch;

const calcGrid = () => gridCellsPrompt * gridCellsPrompt;
const calcCell = () => 600 / gridCellsPrompt;
const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateGrid = () => {
  for (let i = 0; i < calcGrid(); i++) {
    const div = document.createElement("div");
    div.style.width = calcCell() + "px";
    div.style.height = calcCell() + "px";
    container.appendChild(div).classList.add("sketch-cell");
  }
  sketch = document.querySelectorAll(".sketch-cell");

  sketch.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      if (e.buttons === 1) {
        if (black.checked) cell.style.backgroundColor = "black";
        if (rainbow.checked) cell.style.backgroundColor = randomColor();
      }
    });
  });
};
generateGrid();

///////////////////////////////////
// FORMULA canvas width / gridCellsPrompt = cell width/height px

// Clear existing grid
const clearGrid = () => {
  sketch.forEach((cell) => {
    cell.parentNode.removeChild(cell);
  });
};

// Change grid cells per row
btnChangeGrid.addEventListener("click", () => {
  gridCellsPrompt = +prompt("How many cells per row you want?");
  if (gridCellsPrompt >= 100) return alert("Pick number up to 100!");
  clearGrid();
  generateGrid();
});
