import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function BarChart(props) {
  let options = {
    responsive: true,
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

  let data = {
    labels: props.xaxis?.labels,
    datasets: [],
  }

  props.datasets.forEach( element => {
    if (element.backgroundColor === undefined)
      element.backgroundColor = ["blue"]

    data.datasets.push(element)
  })

  return <Bar options={options} data={data} />
}