const btn = document.querySelector("button");
btn.onclick = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".name").innerHTML = JSON.stringify(response.name);
      document.querySelector(".date").innerHTML = JSON.stringify(
        response.releaseDate
      );

      document.querySelector(".episodes").innerHTML = JSON.stringify(
        response.episodes
      );
      document.querySelector(".director").innerHTML = JSON.stringify(
        response.creaters.director
      );
      document.querySelector(".producer").innerHTML = JSON.stringify(
        response.creaters.producer
      );
      document.querySelector(".writer").innerHTML = JSON.stringify(
        response.creaters.siptwriter
      );
    });
};
