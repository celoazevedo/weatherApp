// https://docs.stormglass.io/#/sources --- for weather data!

// Use the geolocation api

document.querySelector("button").addEventListener("click", getFetch);
// const lat = 32.750217;
// const lng = -117.183346;
// const dateNow = Date.now();
const airTemp = "airTemperature";
const windSpeed = "windSpeed";
const windDirection = "windDirection";
const swellHeight = "swellHeight";

const airTempArr = [];
const swellHeightArr = [];
const xlabels = [];

//////// IMPLEMENT CHART /////
///use chart.js
function chartIt() {
  const ctx = document.getElementById("chart").getContext("2d");
  const sctx = document.getElementById("schart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Air temperature (C°)",
          data: airTempArr,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a degree sign in the ticks
              callback: function (value, index, values) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });

  const swellChart = new Chart(sctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Air temperature (C°)",
          data: swellHeightArr,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a degree sign in the ticks
              callback: function (value, index, values) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });
  // myChart.resize();
  // swellChart.resize();
}

// document.querySelector("button").addEventListener("click", getFetch);
document.querySelector("button").addEventListener("click", getFetch);
function getFetch() {
  const lat = document.querySelector("#inputBoxLatitude").value;
  const lng = document.querySelector("#inputBoxLongitude").value;

  fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${airTemp},${windSpeed},${swellHeight},${windDirection}`,
    {
      headers: {
        Authorization:
          "2ccf56d0-68cd-11eb-b2a7-0242ac130002-2ccf575c-68cd-11eb-b2a7-0242ac130002",
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      document.querySelector("#time").innerText = jsonData.hours[0].time;
      document.querySelector(
        "#airTemp"
      ).innerText = `${jsonData.hours[0].airTemperature.noaa} °C`;
      document.querySelector("#windDirection").innerText =
        jsonData.hours[0].windDirection.noaa;
      document.querySelector(
        "#windSpeed"
      ).innerText = `${jsonData.hours[0].windSpeed.noaa} meters/second`;
      document.querySelector(
        "#swellHeight"
      ).innerText = `${jsonData.hours[0].swellHeight.noaa} meters`;
      // document.querySelector("#date").innerText = jsonData.hours[0].time;
      jsonData.hours.forEach((element) => {
        xlabels.push(element.time.slice(2, 16));
        airTempArr.push(Number(element.airTemperature.noaa + "°C"));
        swellHeightArr.push(Number(element.swellHeight.noaa + "meters"));
        // console.log(element.time.slice(2, 16));
      });
      console.log(jsonData.hours[0]);
      console.log(airTempArr);
      console.log(xlabels);
      chartIt();
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
// getFetch();

// this is not going to work because we dont have the data back yet. The response is still on its way
// function showAnswer() {
//   document.querySelector("h2").innerText = answer;
// }
