let mines = [];
let minesNum = [];
let clicks = 0;
let n = 784;
let m = 120;
const fillCells = event => {
  for (let i = 0; i < m; i++) {
    let rand = Math.round(0 - 0.5 + Math.random() * n);
    let curId = +event.target.id;
    console.log(curId);
    while (
      minesNum.indexOf(rand) != -1 ||
      (rand >= curId - 29 && rand <= curId - 27) ||
      (rand >= curId - 1 && rand <= curId + 1) ||
      (rand >= curId + 27 && rand <= curId + 29)
    )
      rand = Math.round(0 - 0.5 + Math.random() * n);
    minesNum[i] = rand;
  }
  console.log(minesNum);
  for (let i = 0; i < m; i++) {
    mines[minesNum[i]].numOfMines = -1;
  }
  for (let i = 0; i < n; i++) {
    let numOfMines = 0;
    if (minesNum.indexOf(i) == -1) {
      if (i % 28 != 0) {
        if (minesNum.indexOf(i - 1) != -1) numOfMines = numOfMines + 1;
        if (i > 27)
          if (minesNum.indexOf(i - 29) != -1) numOfMines = numOfMines + 1;
        if (i < 784 - 28)
          if (minesNum.indexOf(i + 27) != -1) numOfMines = numOfMines + 1;
      }
      if (i % 28 != 27) {
        if (minesNum.indexOf(i + 1) != -1) numOfMines = numOfMines + 1;
        if (i > 27)
          if (minesNum.indexOf(i - 27) != -1) numOfMines = numOfMines + 1;
        if (i < 784 - 28)
          if (minesNum.indexOf(i + 29) != -1) numOfMines = numOfMines + 1;
      }
      if (i > 27)
        if (minesNum.indexOf(i - 28) != -1) numOfMines = numOfMines + 1;
      if (i < 784 - 28)
        if (minesNum.indexOf(i + 28) != -1) numOfMines = numOfMines + 1;
      mines[i].numOfMines = numOfMines;
    }
  }
};
const mineReducer = event => {
  if (clicks == 0) fillCells(event);
  if (event.isTrusted) clicks = clicks + 1;
  let curId = +event.target.id;
  console.log(event);
  switch (mines[curId].numOfMines) {
    case -1:
      console.log("end");
      break;
    case 0:
      if (!mines[curId].checked) {
        event.target.style.background = "lightblue";

                mines[curId].checked = true;
        if (curId % 28 != 27) {
          document
            .getElementById((curId + 1).toString())
            .dispatchEvent(new Event("click"));
          if (curId > 27)
            document
              .getElementById((curId - 27).toString())
              .dispatchEvent(new Event("click"));
          if (curId < 784 - 28)
            document
              .getElementById((curId + 29).toString())
              .dispatchEvent(new Event("click"));
          mines[curId].checked = true;
        }
        if (curId % 28 != 0) {
          document
            .getElementById((curId - 1).toString())
            .dispatchEvent(new Event("click"));
          if (curId > 27)
            document
              .getElementById((curId - 29).toString())
              .dispatchEvent(new Event("click"));
          if (curId < 784 - 28)
            document
              .getElementById((curId + 27).toString())
              .dispatchEvent(new Event("click"));
        }
        if (curId > 27)
          document
            .getElementById((curId - 28).toString())
            .dispatchEvent(new Event("click"));
        if (curId < 784 - 28)
          document
            .getElementById((curId + 28).toString())
            .dispatchEvent(new Event("click"));
      }
      break;
    default:
      event.target.style.background = "blue";
      event.target.innerHTML = mines[curId].numOfMines;
      mines[curId].checked = true;
      break;
  }
};

const showfield = () => {
  for (let i = 0; i < n; i++) {
    let minecell = document.createElement("div");
    minecell.className = "minecell";
    minecell.id = i.toString();
    mines[i] = {num: i, numOfMines: "", checked: false};
    console.log(mines[i]);
    document.getElementById("field").appendChild(minecell);
  }
  console.log("Added");

  for (let i = 0; i < n; i++)
    document
      .getElementById(mines[i].num.toString())
      .addEventListener("click", mineReducer, false);
};
document.addEventListener("DOMContentLoaded", showfield);
