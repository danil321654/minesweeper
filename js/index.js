let mines = [];

const mineReducer = (event) => {
  switch (mines[+event.target.id].mineOrNo) {
    case 0:
      console.log("end");
      break;
    case 1:
      console.log("num");
      break;
    case 2:
      console.log("expanding");
      break;
    default:
      console.log("exp");
      break;

  }

}

const fillCells = () => {
  let n = 756;
  let m = 50;
  for (let i = 0; i < n; i++) {
    let minecell = document.createElement("div");
    minecell.className = "minecell";
    minecell.id = i.toString();
    mines[i] = {num: i, mineOrNo: Math.floor(Math.random()*3)};
    console.log(mines[i]);
    document.getElementById("field").appendChild(minecell);
  }
  console.log("Added");

  for (let i = 0; i < n; i++) document.getElementById(mines[i].num.toString()).addEventListener("click", mineReducer, false);
};
document.addEventListener("DOMContentLoaded", fillCells);
