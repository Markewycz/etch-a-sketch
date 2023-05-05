const container = document.querySelector(".board-sketch");

const sliderGrid = document.querySelector("#change-grid");
const gridPreview = document.querySelector(".grid-preview");

const btnClearGrid = document.querySelector(".clear-grid");
const btnEraser = document.querySelector(".eraser");
const colorPicker = document.querySelector(".color-picker");
const rainbow = document.querySelector(".rainbow");
const shadow = document.querySelector(".shadow");
const eraser = document.querySelector(".eraser");

let size = 16;
let sketch;
let mode = 0;

15625;
125;
///////////////////
// Functions
const calcCell = () => 500 / size;
const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateGrid = () => {
  for (let i = 1; i <= size * size; i++) {
    const square = document.createElement("div");
    square.style.width = calcCell() + "px";
    square.style.height = calcCell() + "px";
    container.appendChild(square).classList.add("sketch-cell");

    if (i == 1) {
      square.style.borderTopLeftRadius = "10px";
    } else if (i == size) {
      square.style.borderTopRightRadius = "10px";
    } else if (i == size * size - size + 1) {
      square.style.borderBottomLeftRadius = "10px";
    } else if (i == size * size) {
      square.style.borderBottomRightRadius = "10px";
    }
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
  size = value;
  clearGrid();
  generateGrid();
};
