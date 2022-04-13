import React, { useState } from 'react'
import { requestAnalytialData } from '../../utility/requestServer'
import Chart from '../Chart'

const Analytics = (props) => {

    const {
        today,
        setShowAlert,
        setOpenAnalyticsPopup,
    } = props

    const [businessData, setBusinessData] = useState([])
    const [currencyData, setCurrencyData] = useState([])
    const [openChart, setOpenChart] = useState(false)
    const [data, setData] = useState({
        clear_date_from: today,
        clear_date_to: today,
        due_date_from: today,
        due_date_to: today,
        baseline_create_date_from: today,
        baseline_create_date_to: today,
        invoice_currency: "'USD'"
    })

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getAnalyticalData = async () => {
        const res = await requestAnalytialData(data)
        setBusinessData(res.businessData)
        setCurrencyData(res.currencyData)
        setOpenChart(true)
    }

    return (
        <>
            {openChart && <Chart
                businessData={businessData}
                currencyData={currencyData}
                setOpenChart={setOpenChart}
                setOpenAnalyticsPopup={setOpenAnalyticsPopup}
            />}
            <div className="Popup analyticsPopup">
                <div className="container">
                    <h3>Analytics View</h3>

                    <div className="popupInputContainer">
                        <div className="inner">
                            <p>Clear Date</p>
                            <div className="contain">
                                <p>From</p>
                                <input type="date" value={data.clear_date_from} name="clear_date_from" placeholder='From' onChange={(e) => handleDataChange(e)} />
                            </div>
                            <div className="contain">
                                <p>To</p>
                                <input type="date" value={data.clear_date_to} name="clear_date_to" placeholder='To' onChange={(e) => handleDataChange(e)} />
                            </div>

                        </div>
                        <div className="inner">
                            <p>Due Date</p>
                            <div className="contain">
                                <p>From</p>
                                <input type="date" value={data.due_date_from} name="due_date_from" placeholder='From' onChange={(e) => handleDataChange(e)} />
                            </div>
                            <div className="contain">
                                <p>To</p>
                                <input type="date" value={data.due_date_to} name="due_date_to" placeholder='To' onChange={(e) => handleDataChange(e)} />
                            </div>
                        </div>
                        <div className="inner">
                            <p>Baseline Create Date</p>
                            <div className="contain">
                                <p>From</p>
                                <input type="date" value={data.baseline_create_date_from} name="baseline_create_date_from" placeholder='From' onChange={(e) => handleDataChange(e)} />
                            </div>
                            <div className="contain">
                                <p>To</p>
                                <input type="date" value={data.baseline_create_date_to} name="baseline_create_date_to" placeholder='To' onChange={(e) => handleDataChange(e)} />
                            </div>
                        </div>
                        <div className="inner">
                            <p>Invoice Currency</p>
                            {/* <input type="text" value={data.invoice_currency} id='invoice_input' name="invoice_currency" placeholder='Invoice Currency' onChange={(e) => handleDataChange(e)} /> */}
                            <select name="invoice_currency" id="invoice_input" onChange={(e) => handleDataChange(e)}>
                                <option value="'USD'">USD</option>
                                <option value="'CAD'">CAD</option>
                                <option value="'USD', 'CAD'">Both</option>
                            </select>
                        </div>
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' onClick={() => getAnalyticalData()}>Submit</button>
                        <button className='popupBtn' onClick={() => setOpenAnalyticsPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics