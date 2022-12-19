const tabs = document.querySelectorAll(".tabehader__item");
const tabsParent = document.querySelectorAll(".tabehader__items");
const tabsContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
  tabsContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};
hideTabContent();

const showTabContent = (i = 0) => {
  tabsContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};
showTabContent();

tabsParent.addEventListener("click", (event) => {
  if (event.target.classList.contains) {
  }
});
