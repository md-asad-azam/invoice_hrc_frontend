import React from 'react'

import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

const Analytics = () => {

    const style = {
        backgroundColor: "white",
        width: "90vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1vmax auto"
    }

    const barData = {
        // labels: data.map((item) => item.business_code),
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],

        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['rgb(255, 99, 132)', "blue"],
            borderColor: ['rgb(255, 99, 132)', "black"],
            // data: data.map((item) => item.total_open_amount),
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    }
    const pieData = {
        // labels: data.map((item) => item.business_code),
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],

        datasets: [{
            label: ['My First dataset', ""],
            backgroundColor: ['aquamarine', "wheat"],
            borderColor: ["white"],
            // data: data.map((item) => item.total_open_amount),
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    }
    return (
        <>
            <div className="analyticsContainer" style={style}>
                <Bar data={barData} />
                <Pie data={pieData} />
            </div>
        </>
    )
}

export default Analytics