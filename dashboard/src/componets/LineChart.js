import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function BarChart(props) {
  let options = {
    responsive: true,
    scales: {
      y : {
        ticks: {
          callback: function(value, index, ticks) {
              return value + " Mb";
          }
        }
      },
      x : {
        title: {
          display: true,
          text: "Build"
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: props.title?.text || false,
        text: props.title?.text,
      },
      tooltip: {
        enabled: false, //props.tooltip !== undefined,
        position: 'nearest',
        external: props.tooltip?.handler
      } 
    },
  }

  if (props.yaxisMax)
    options.scales.y.max = props.yaxisMax

  if (props.yaxisMin)
    options.scales.y.min = props.yaxisMin

  let data = {
    labels: props.xaxis?.labels,
    datasets: [],
  }

  props.datasets.forEach( element => {
    if (element.backgroundColor === undefined)
      element.backgroundColor = ["blue"]

    if (element.borderColor === undefined)
      element.borderColor = 'rgb(53, 162, 235)'

    data.datasets.push(element)
  })

  return <Line options={options} data={data} />
}