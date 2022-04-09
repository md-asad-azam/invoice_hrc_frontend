import React, { useState } from 'react'

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const BarChart = ({ data }) => {

    const style = {
        backgroundColor: "white"
    }

    const [chartData, setChartData] = useState({
        // labels: data.map((item) => item.business_code),
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],

        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['rgb(255, 99, 132)', "blue"],
            borderColor: ['rgb(255, 99, 132)', "black"],
            // data: data.map((item) => item.total_open_amount),
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    })

    console.log(data);

    return (
        <>
            <div className="barChart" style={style}>
                <Chart type='line' data={chartData} />
            </div>
        </>
    )
}

export default BarChart