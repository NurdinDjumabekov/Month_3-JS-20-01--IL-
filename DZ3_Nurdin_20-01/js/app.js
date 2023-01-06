const tabsContent = document.querySelectorAll(".tabcontent");
const tabsParet = document.querySelector(".tabheader__items");
const tabs = document.querySelectorAll(".tabheader__item");

const hideTabContent = () => {
  tabsContent.forEach((i) => {
    i.style.display = "none";
  });
  tabs.forEach((i) => {
    i.classList.remove("tabheader__item_active");
  });
};
hideTabContent();

const showTabContent = (i = 0) => {
  tabsContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};

showTabContent();
///////////////////////////////////////////////////////////
// здание 1

tabsParet.addEventListener("click", (e) => {
  if (e.target.classList.contains("tabheader__item")) {
    tabs.forEach((item, i) => {
      if (e.target === item) {
        hideTabContent();
        showTabContent(i);
        c = i;
      }
    });
  }
});

let j = 0;
const slider = (e) => {
  setInterval((i) => {
    if (j === 4) j = 0;
    hideTabContent();
    showTabContent(j);
    j++;
  }, 2000);
};
slider();

// tabsParet.addEventListener("click", (e) => {
//   if (e.target.classList.contains("tabheader__item")) {
//     tabs.forEach((item, i) => {
//       if (e.target === item) {
//         hideTabContent();
//         showTabContent(i);
//       }
//     });
//   }
// });
// function nn() {

//////////////////////////////////////////////
// один из вариантов решения(недоделанный)
/////////////////////////////////////////////
// let a = -1;
// function recursia() {
//   setTimeout(() => {
//     if (a < 3) {
//       a++;
//       console.log(a);
//       if (tabs[a] === 0) {
//         hideTabContent();
//         showTabContent(i);
//       }
//       setTimeout(() => {
//         if (a === 3) {
//           a = 0;
//           console.log(a);
//           recursia();
//         }
//       }, 5000);
//       recursia();
//     }
//   }, 1000);
// }
// recursia();

/////////////////////////////////

const modal = document.querySelector(".modal");
const modalTrigger = document.querySelector(".btn_white");
const closeModalBTN = document.querySelector(".modal__close");

const openModal = () => {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
};

modalTrigger.addEventListener("click", openModal);
closeModalBTN.addEventListener("click", closeModal);

//////////////////////////////////////////////

const a = window.pageYOffset;
console.log(a);
const b = document.scrollingElement.scrollHeight;
console.log(b, "полный скрол по высоте");
// const c = document.scrollingElement;
// console.log(c);
const d = document.scrollingElement.scrollTop;
console.log(d);
const scroll = () => {
  if (d >= 2950) {
    openModal();
  }
};
scroll();
