module.exports = {
  option: {
    default: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: "#ECF0F1",
          fontSize: 15,
          padding: 25,
        },
      },
      tooltips: {
        intersect: false,
        titleFontSize: 14,
        titleSpacing: 5,
        xPadding: 10,
        caretSize: 7,
        caretPadding: 7,
        multiKeyBackground: "transparent",
      },
      elements: {
        point: {
          pointStyle: "circle",
          radius: 3,
          hoverRadius: 4,
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "rgba(127, 140, 141, 0.250)",
            },
            ticks: {
              fontColor: "#ECF0F1",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: "rgba(127, 140, 141, 0.250)",
            },
            ticks: {
              fontColor: "#ECF0F1",
            },
          },
        ],
      },
    },
  },
};
