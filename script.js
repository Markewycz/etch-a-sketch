const container = document.querySelector(".board-sketch");

const sliderGrid = document.querySelector("#change-grid");
const gridPreview = document.querySelector(".grid-preview");

const btnClearGrid = document.querySelector(".clear-grid");
const btnEraser = document.querySelector(".eraser");
const colorPicker = document.querySelector(".color-picker");
const rainbow = document.querySelector(".rainbow");
const shadow = document.querySelector(".shadow");
const eraser = document.querySelector(".eraser");

let gridCellsPrompt = 16;
let sketch;
let mode = 0;

15625;
125;
///////////////////
// Functions
const calcGrid = () => gridCellsPrompt * gridCellsPrompt;
const calcCell = () => 500 / gridCellsPrompt;
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

  gridPreview.textContent = `${sliderGrid.value}x${sliderGrid.value}`;

  sketch.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      if (e.buttons === 1) {
        if (mode === 0) cell.style.backgroundColor = colorPicker.value;
        if (mode === 1) cell.style.backgroundColor = randomColor();
        if (mode === 2) cell.style.backgroundColor = "";
        if (mode === 3) {
          let opacity = 0.1;

          if (!cell.style.backgroundColor) {
            cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
          }

          console.log(cell.style.backgroundColor);
          if (cell.style.backgroundColor === `rgba(0, 0, 0, ${opacity})`) {
            opacity += 0.1;
            cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
            console.log(cell.style.backgroundColor, opacity);
          }
        }
      }
      cell.addEventListener("click", (e) => {
        if (mode === 0) cell.style.backgroundColor = colorPicker.value;
        if (mode === 1) cell.style.backgroundColor = randomColor();
        if (mode === 2) cell.style.backgroundColor = "";
        if (mode === 3) console.log(cell);
      });
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
shadow.addEventListener("click", () => (mode = 3));

btnClearGrid.addEventListener("click", () => {
  clearGrid();
  generateGrid();
});

const previewGrid = (value) => (gridPreview.textContent = `${value}x${value}`);
const changeGrid = (value) => {
  gridCellsPrompt = value;
  clearGrid();
  generateGrid();
};
