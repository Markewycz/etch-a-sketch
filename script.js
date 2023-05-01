const container = document.querySelector(".sketch-container");
const div = document.createElement("div");

const sliderGrid = document.querySelector("#change-grid");
const gridPreview = document.querySelector(".grid-preview");

const btnClearGrid = document.querySelector(".clear-grid");
const btnEraser = document.querySelector(".eraser");
const colorPicker = document.querySelector(".color-picker");
const rainbow = document.querySelector(".rainbow");
const eraser = document.querySelector(".eraser");

let gridCellsPrompt = 16;
let sketch;
let mode = 0;

///////////////////
// Functions
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

  gridPreview.textContent = `${sliderGrid.value}x${sliderGrid.value}`

  sketch.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      if (e.buttons === 1) {
        if (mode === 0) cell.style.backgroundColor = colorPicker.value;
        if (mode === 1) cell.style.backgroundColor = randomColor();
        if (mode === 2) cell.style.backgroundColor = "";
      }
    });
  });
};
generateGrid();

const clearGrid = () => {
  sketch.forEach((cell) => {
    cell.parentNode.removeChild(cell);
  });
};

/////////////////////
// Event listeners

colorPicker.addEventListener("click", () => (mode = 0));
rainbow.addEventListener("click", () => (mode = 1));
eraser.addEventListener("click", () => (mode = 2));

btnClearGrid.addEventListener("click", () => {
  clearGrid();
  generateGrid();
});

const changeGrid = (value) => {
  gridCellsPrompt = value;
  gridPreview.textContent = `${value}x${value}`;
  clearGrid();
  generateGrid();
};

// sliderGrid.addEventListener("click", () => {
//   gridCellsPrompt = +prompt("How many cells per row you want?");
//   if (gridCellsPrompt >= 100) return alert("Pick number up to 100!");
//   clearGrid();
//   generateGrid();
// });
