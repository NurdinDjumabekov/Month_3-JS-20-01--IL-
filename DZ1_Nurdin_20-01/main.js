const gmailInput = document.getElementById("customerGmail");
const btnStart = document.querySelector(".btn_start");
const btn_result = document.getElementById("btn_inner_down");
const div_parent = document.querySelector(".div_parent_2");
const div_main = document.querySelector(".div_main");
// nur-din.Djumabekov_2002@gmail.com
const gmailRegExp_1 = /^[A-Za-z0-9\-\.\_]+\@[gmail]+\.[A-Za-z]{2,3}$/;
function startFunction() {
  if (gmailRegExp_1.test(gmailInput.value)) {
    btn_result.innerText = "✓";
    btn_result.style.backgroundColor = "green";
    div_main.style.backgroundColor = "#66cc33";
  } else {
    btn_result.innerText = "✖";
    btn_result.style.backgroundColor = "red";
    div_main.style.backgroundColor = "#990000";
  }
}

btnStart.onclick = () => {
  startFunction();
  const btn_update = document.createElement("button");
  btn_update.setAttribute("class", "btn_upDate");
  btn_update.innerText = "up";
  div_parent.append(btn_update);
  btn_update.onclick = () => {
    location.reload();
  };
};
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

const innerSquare = document.querySelector(".div_inner_square_1");
const innerSquare_bnt = document.querySelector(".bnt_square");
const parent_square = document.querySelector(".parent_square");
innerSquare_bnt.onclick = () => {
  let marginLeft = 0;
  let i = 0;
  innerSquare.style.marginLeft = "0px";
  function startLeft() {
    i += 50;
    innerSquare.style.marginLeft = i + "px";
    setTimeout(() => {
      if (i < 646) {
        startLeft();
        if (i >= 645) {
          parent_square.style.backgroundColor = "green";
        }
      }
    }, 100);
  }
  startLeft();
};

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
