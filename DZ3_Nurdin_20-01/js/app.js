const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};
hideTabContent();
const showTabContent = (i = 0) => {
  tabContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};
showTabContent();

// дз задание первое
let c = 0;
const slider = (e) => {
  setInterval((i) => {
    if (c === 4) c = 0;
    hideTabContent();
    showTabContent(c);
    c++;
  }, 2300);
};
slider();
tabsParent.addEventListener("click", (e) => {
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
// конец первого задания дз

// modal
const modal = document.querySelector(".modal");
const modalTrigger = document.querySelector(".btn_white");
const closeModalBtn = document.querySelector(".modal__close");

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
closeModalBtn.addEventListener("click", closeModal);

// дз задание второе
const diolog = document.querySelector(".modal__dialog");
modal.addEventListener("click", (e) => {
  if (!diolog.contains(e.target) && modal.classList.contains("show"))
    closeModal();
});
// дз здание третье
const scroolEnd = () => {
  const footer = document.documentElement;
  if (footer.scrollTop + footer.clientHeight >= footer.scrollHeight - 0.8) {
    openModal();
  }
};
window.addEventListener("scroll", scroolEnd);
