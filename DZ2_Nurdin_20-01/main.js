const block = document.getElementsByClassName("block");
let positionX_start = 0;
let positionY_start = 0;
let positionX_end = 448;
let positionY_end = 448;
let a = 0;
const move = () => {
  if (positionX_start <= 440) {
    positionX_start += 15;
    block[0].style.left = `${positionX_start}px`;
    setTimeout(move, 20);
    console.log(positionX_start);
  } else if (positionX_start >= 440 && positionY_start <= 440) {
    positionY_start += 15;
    block[0].style.top = `${positionY_start}px`;
    setTimeout(move, 20);
    console.log(positionY_start);
  } else if (positionX_end > 0) {
    positionX_end -= 15;
    block[0].style.left = `${positionX_end}px`;
    setTimeout(move, 20);
    console.log(positionX_end);
  } else if (positionY_end > 0) {
    positionY_end -= 15;
    block[0].style.top = `${positionY_end}px`;
    setTimeout(move, 20);
    console.log(positionY_end);
  } else if (positionY_end === -2) {
    location.reload();
  }
};
move();

// ////////////////////////////////////////////////////////////////////

let time = setInterval(() => console.log("start"), 1000);
setTimeout(() => {
  clearInterval(time);
}, 60000);
