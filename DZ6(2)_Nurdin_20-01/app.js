const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const eu = document.querySelector("#eu");
const convert = (a, target, target2) => {
  a.oninput = () => {
    // const request = new XMLHttpRequest()
    // request.open('GET', "data.json")
    // request.setRequestHeader('Content-type', 'application/json')
    // request.send()

    fetch("data.json")
      .then((response) => response.json())
      .then((json) => {
        if (a === som) {
          target.value = (a.value / json.usd).toFixed(2);
          target2.value = (a.value / json.eu).toFixed(2);
        } else if (a === usd) {
          target.value = (a.value * json.usd).toFixed(2);
          target2.value = (target.value / json.eu).toFixed(2);
        } else if (a === eu) {
          target.value = (a.value * json.eu).toFixed(2);
          target2.value = (target.value / json.usd).toFixed(2);
        }
        a.value === "" && (target.value = "");
        a.value === "" && (target2.value = "");
      });
  };
};
convert(som, usd, eu);
convert(usd, som, eu);
convert(eu, som, usd);
