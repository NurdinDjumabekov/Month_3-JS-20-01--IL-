const gmailInput = document.getElementById("customerGmail");
const btnStart = document.querySelector(".btn_start");
const btn_result = document.getElementById("btn_inner_down");
let a = "nur-dinDjumabekov2002@gmail.com";
const gmailRegExp_1 = /^[A-Za-z0-9_\-]+\@gmail+\.[A-Za-z]{2,3}$/;
function startFunction() {
  if (gmailRegExp_1.test(gmailInput.value)) {
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
