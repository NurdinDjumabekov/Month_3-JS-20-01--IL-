const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  const request = new XMLHttpRequest(); // СОЗДАНИЕ ЗАПРОСА
  request.open("GET", "data.json"); // обьявление метода и пути запроса
  request.setRequestHeader("Content-type", "application/json"); // указание типа данных в запросах
  request.send(); //отправка запроса
  request.addEventListener("load", () => {
    const info = JSON.parse(request.response);
    console.log(info);
  });
});
