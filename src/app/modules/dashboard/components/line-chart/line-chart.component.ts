import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit{


  ngOnInit(): void {
    this.loadLineChart()
  }

  loadLineChart() {

    const labels = ['01-10','02-10','03-10','04-10','05-10','06-10','07-10','08-10','09-10',
    '10-10','11-10','12-10','13-10','14-10','15-10','16-10','17-10',
    '18-10','19-10','20-10','21-10','22-10','23-10','24-10','25-10','26-10','27-10','28-10','29-10','30-10','31-10'];
    const data = {
      labels: labels,
      datasets: [
        {
          data: [3255.20,1233.40,2800.50,1500,2006,1800,1500,1263,1444,1800,1600,1700,
            3255.20,1233.40,2800.50,1500,2006,1800,1500,1263,1444,1800,1600,1700,
            3255.20,1233.40,2800.50,1500,2006,1800,1500],
          borderColor: '#78A6C8',
          fill: true,
          backgroundColor: '#9dbed79e'
        }
      ]
    };

    const myChart = new Chart('myChart', {
      type: 'line',
      data: data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          line: {
            tension: 0.5
          },
          point: {
            radius: 2,
            hitRadius: 3,
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value) => {
                  return 'S/.'+this.convertLongNumberToShortNumberText(value);
              }
          },
            grid: {
              display: false,
            },
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            titleColor: '#326789',
            displayColors: false,
            bodyColor:"#000",
            backgroundColor: '#fff',
            borderColor: '#326789',
            borderWidth: 1,
            callbacks: {
              label: (data: any) =>  {
                return 'S/.'+data.dataset.data[data.dataIndex]
              }
            }
          },
          legend: {
            display: false,
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 14,
                      family: "Roboto, 'Helvetica Neue', sans-serif; "
                  }
              }
          }
      }
      },
      
  });
  
  }

   convertLongNumberToShortNumberText(num: any) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}
}
