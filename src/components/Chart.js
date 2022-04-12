import React from 'react'

import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';
import CloseIcon from '@mui/icons-material/Close';
import "../css/Chart.css"

const Chart = (props) => {

    const {
        businessData,
        currencyData,
        setOpenChart,
        setOpenAnalyticsPopup
    } = props

    var currency = [], count = []
    currencyData.map((item, i) => {
        if (i % 2 === 0) {
            currency.push(item)
        } else {
            count.push(item)
        }
    })

    const barData = {
        labels: businessData.map((item) => item.business_code),

        datasets: [{
            label: 'Total Open Amount',
            backgroundColor: ['aquamarine'],
            borderColor: "black",
            borderWidth: 1,
            data: businessData.map((item) => item.total_open_amount),
        },
        {
            label: 'No Of Customers',
            backgroundColor: ["wheat"],
            borderColor: "black",
            borderWidth: 1,
            data: businessData.map((item) => item.total_customer),
        }]
    }
    const pieData = {
        labels: currency,
        
        datasets: [{
            backgroundColor: ['rgba(127, 255, 212, 0.7)', "rgba(245, 222, 179, 0.7)"],
            borderColor: ['aquamarine', "wheat"],
            data: count,
        }]
    }
    return (
        <>
            <div className="analyticsContainer" >
                <div className="closeButtonContainer"
                    onClick={() => {
                        setOpenChart(false)
                        setOpenAnalyticsPopup(false)
                    }}>
                    <CloseIcon />
                </div>
                <div className="barContainer" >
                    <h2>Business Information</h2>
                    <Bar data={barData} />
                </div>
                <div className="pieContainer">
                    <h2>Currency Information</h2>
                    <Pie data={pieData} />
                </div>
            </div>
        </>
    )
}

export default Chart