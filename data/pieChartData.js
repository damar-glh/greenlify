const pieChartDataByYear = {
    2023: {
      series: [
        43.35046982595065,
        12.64587499379597,
        11.927807388171178,
        21.190239083691303,
        3.5021606069872737,
        7.3834481014036335
      ],
      options: {
        chart: {
          type: "pie",
          toolbar: {
            show: false,
          },
        },
        labels: [
          "Lainnya",
          "Kaca",
          "Karet/Kulit",
          "Kain",
          "Logam",
          "Plastik",
          "Kertas/Karton",
          "Kayu/Ranting",
          "Sisa Makanan",
        ],
        colors: [
          "var(--emerald-700)",
          "var(--emerald-600)",
          "var(--emerald-500)",
          "var(--emerald-400)",
          "var(--emerald-300)",
          "var(--emerald-200)",
          "var(--emerald-100)",
        ],
        legend: {
          position: "bottom",
          labels: {
            colors: "#333",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
    },
    2022: {
      series: [
        43.14718048982535,
        13.561038260468816,
        12.366864365469516,
        20.12365350007101,
        3.3586422181011684,
        7.442621166064124
      ],
      options: {
        chart: {
          type: "pie",
          toolbar: {
            show: false,
          },
        },
        labels: [
          "Lainnya",
          "Kaca",
          "Karet/Kulit",
          "Kain",
          "Logam",
          "Plastik",
          "Kertas/Karton",
          "Kayu/Ranting",
          "Sisa Makanan",
        ],
        colors: [
          "var(--emerald-700)",
          "var(--emerald-600)",
          "var(--emerald-500)",
          "var(--emerald-400)",
          "var(--emerald-300)",
          "var(--emerald-200)",
          "var(--emerald-100)",
        ],
        legend: {
          position: "bottom",
          labels: {
            colors: "#333",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
    },
    2021: {
      series: [
        41.94611206788699,
        13.787090529355462,
        12.984536147272058,
        19.521280830581226,
        3.6024258009830357,
        8.158554623921233
      ],
      options: {
        chart: {
          type: "pie",
          toolbar: {
            show: false,
          },
        },
        labels: [
          "Lainnya",
          "Kaca",
          "Karet/Kulit",
          "Kain",
          "Logam",
          "Plastik",
          "Kertas/Karton",
          "Kayu/Ranting",
          "Sisa Makanan",
        ],
        colors: [
          "var(--emerald-700)",
          "var(--emerald-600)",
          "var(--emerald-500)",
          "var(--emerald-400)",
          "var(--emerald-300)",
          "var(--emerald-200)",
          "var(--emerald-100)",
        ],
        legend: {
          position: "bottom",
          labels: {
            colors: "#333",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
    },
    2020: {
      series: [
        43.135205033320496,
        14.200434275698075,
        13.285849409708339,
        19.064740021523257,
        3.2830038160455848,
        7.030767443704263
      ],
      options: {
        chart: {
          type: "pie",
          toolbar: {
            show: false,
          },
        },
        labels: [
          "Lainnya",
          "Kaca",
          "Karet/Kulit",
          "Kain",
          "Logam",
          "Plastik",
          "Kertas/Karton",
          "Kayu/Ranting",
          "Sisa Makanan",
        ],
        colors: [
          "var(--emerald-700)",
          "var(--emerald-600)",
          "var(--emerald-500)",
          "var(--emerald-400)",
          "var(--emerald-300)",
          "var(--emerald-200)",
          "var(--emerald-100)",
        ],
        legend: {
          position: "bottom",
          labels: {
            colors: "#333",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
    },
  };

  export default pieChartDataByYear;