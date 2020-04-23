module.exports = {
  option: {
    default(activeStatus) {
      return {
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
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "rgba(127, 140, 141, 0.250)",
              },
              ticks: {
                fontColor: activeStatus ? "#ECF0F1" : "#34495E",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "rgba(127, 140, 141, 0.250)",
              },
              ticks: {
                fontColor: activeStatus ? "#ECF0F1" : "#34495E",
              },
            },
          ],
        },
      };
    },
  },
};
