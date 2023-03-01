import React, { useEffect, useState } from 'react'

import { ordersData, ordersGrid } from '../data/dummy';
import { Header, NewChartModal, CustomPie } from '../components'
import { Chart } from 'chart.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { nanoid } from 'nanoid'
import { IoIosAddCircleOutline } from 'react-icons/io';


ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const ChartWidget = ({ chart, key, data, style }) => {

  if (chart === 'CustomPie') {
    return (
      <div className='relative'
        key={key}
        style={{
          border: style.borderOptions,
          borderRadius: style.borderRadius,
          width: style.width,
          height: style.height,
          background: style.background
        }}>
        <CustomPie data={data} />
      </div>
    )
  }

  return (
    <div>
      <p>Gráfico não encontrado</p>
    </div>
  )

}

const CustomReports = () => {

  const [charts, setCharts] = useState([])
  const [showModal, setShowModal] = useState(true)

  const handleNewChart = (chartType, data, border, background, size) => {
    console.log(chartType, data, border, background, size)
    switch (chartType) {
      case 'pie':
        setCharts(currCharts => [...currCharts, {
          chart: 'CustomPie',
          key: nanoid(),
          data: data,
          style: {
            border: border.borderOptions,
            borderRadius: border.borderRadius,
            width: size.width,
            height: size.height,
            background: background
          },
        }])
        break;
      default:
        break;
    }


  }

  useEffect(() => {
    console.log(charts)

  }, [charts])

  console.log(charts)

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  return (
    // handleNewChart('pie', data, { border: '2px solid #888', borderRadius: '25px' }, '#EEE', { width: '360px', height: '360px' })
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      {showModal && (<NewChartModal showModal={showModal} closeModal={handleShowModal} handleNewChart={handleNewChart} />)}
      <Header category='Integrações' title='Relatórios Customizáveis' />
      <div className='grid gap-2 mb-2 place-items-end'>
          <button
              type="button"
              onClick={ handleShowModal}
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-4xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <IoIosAddCircleOutline />
            </button>
      </div>
      <div className='flex flex-wrap gap-2 w-full'>
        {charts.map((chart, index) => (
          <ChartWidget chart={chart.chart} key={chart.key} data={chart.data} style={chart.style} />
        ))}
      </div>

    </div>
  )
}

export default CustomReports