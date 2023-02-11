const input = document.querySelector("#input");
const button = document.querySelector("#btn");
const result = document.querySelector("#result");
const regExp_2 = /^\d{14}$/;
const regExpMan = /^1\d{13}$/;
const regExpWoman = /^2\d{13}$/;
button.addEventListener("click", () => {
  if (regExp_2.test(input.value)) {
    if (regExpMan.test(input.value)) {
      result.innerHTML = "Вы ввели верный ИНН , и он женский";
      result.style.color = "green";
    } else if (regExpWoman.test(input.value)) {
      result.innerHTML = "Вы ввели верный ИНН , и он мужской";
      result.style.color = "green";
    } else {
      result.innerHTML = "Вы ввели неверный ИНН";
      result.style.color = "red";
    }
  } else {
    result.innerHTML = "Вы ввели неверный ИНН";
    result.style.color = "red";
  }
});

///////////////////////////////////////////////////////

// 20202200254186

const btn_block = document.getElementById("btn_block");
const box = document.querySelector(".box");
let i = 0;
btn_block.addEventListener("click", () => {
  function startDrive() {
    setTimeout(() => {
      i += 30;
      // box.style.left = `${i}px`;
      box.style.left = i + "px";
      if (i < 450) {
        startDrive();
      }
    }, 100);
  }
  startDrive();
});

const btn_restart = document.querySelector("#btn_restart");
btn_restart.addEventListener("click", () => {
  location.reload();
});
