const generateColor = () => {
    var r = Math.floor(Math.random() * 256); // Random between 0-255
    var g = Math.floor(Math.random() * 256); // Random between 0-255
    var b = Math.floor(Math.random() * 256); // Random between 0-255
    var rgb = "rgba(" + r + "," + g + "," + b + ", 0.5)"; // Collect all to a string
    return rgb;
};

const generateSameColor = (colorQuantity, color) => {
    let colorArray = [];

    for (let i = 0; i < colorQuantity; i++) {
        colorArray.push(color);
    }

    return colorArray;
};

let regionChartConfig = {
    type: "doughnut",
    data: {
        labels: [],
        datasets: [
            {
                label: "Porcentagem de reclamações por região",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(7, 92, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)"
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        
    }
};

let stateChartData = {
    type: "bar",
    data: {
        labels: [],
        datasets: [
            {
                label: "Porcentagem de Reclamações",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: generateSameColor(
                    9,
                    "rgba(54, 162, 235, 0.5)"
                ),
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
};

let companyConfig = {
    type: 'polarArea',
    data: {
        datasets: [{
            data: [
              
            ],
            backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(7, 92, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)"
            ],
            borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1,
            label: 'Quantidade de Reclamações'
        }],
        labels: [
          
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

let ratingConfig = {
    type: 'line',
    data: {
        datasets: [{
            data: [
              
            ],
          
            label: 'Média de Reclamações por Mês'
        }],
        labels: [
          
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};
 

export { regionChartConfig, stateChartData, companyConfig, ratingConfig };
