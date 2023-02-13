const gmailInput = document.querySelector("#customerGmail");
const btnStart = document.querySelector(".btn_start");
const btn_result = document.querySelector("#btn_inner_down");
const input_2 = document.querySelector("#input_2");
// ermektoktosunov4@gmail.com
const gmailRegExp_1 = /^[A-Za-z0-9_\-]+\@[gmail]+\.[A-Za-z]{2,3}$/;
const gmailRegExp_2 = /^[A-Za-z0-9]{4,20}$/;
function startFunction() {
  if (gmailRegExp_1.test(gmailInput.value) && gmailRegExp_2.test(input_2.value) ) {
    btn_result.innerText = "✓";
    btn_result.style.backgroundColor = "green";
  } else {
    btn_result.innerText = "✖";
    btn_result.style.backgroundColor = "red";
  }
}


btnStart.onclick = () => {
  startFunction();

};

///////////////////////////////////////////////////////////////

const innerSquare = document.querySelector(".div_inner_square_1");
const innerSquare_bnt = document.querySelector(".bnt_square");
innerSquare_bnt.onclick = function () {
  let marginLeft = 0;
  innerSquare.style.marginLeft = "0px";
  let i = 0;
  function startLeft() {
    i = i + 10;
    innerSquare.style.marginLeft = i + "px";
    if (i < 646) {
      setTimeout(() => {
        startLeft();
      }, 50);
    }
  }
  startLeft();
};

