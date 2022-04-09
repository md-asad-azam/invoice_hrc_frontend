import React from 'react'
import { requestAddData } from '../../utility/requestServer'

const Add = (props) => {

    const { 
        setShowAlert,
        data, setData,
        setOpenAddPopup,
    } = props

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleAddData = async () => {
        const res = await requestAddData(data)
        setOpenAddPopup(false)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setShowAlert({ open: true, message: res.success, type: "success" })
        }
    }

    return (
        <>
            <div className="Popup addPopup openTab" >
                <div className="container">
                    <h3>Add</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="business_code" value={data.business_code} placeholder='Business Code' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="cust_number" value={data.cust_number} placeholder='Customer Number' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Clear Date</p>
                            <input type="date" name="clear_date" value={data.clear_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="buisness_year" value={data.buisness_year} placeholder='Business Year' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="doc_id" value={data.doc_id} placeholder='Document Id' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Posting Date</p>
                            <input type="date" name="posting_date" value={data.posting_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Document Create Date</p>
                            <input type="date" name="document_create_date" value={data.document_create_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Due Date</p>
                            <input type="date" name="due_in_date" value={data.due_in_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="invoice_currency" value={data.invoice_currency} placeholder='Invoice Currency' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="document_type" value={data.document_type} placeholder='Document Type' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="posting_id" value={data.posting_id} placeholder='Posting id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="total_open_amount" value={data.total_open_amount} placeholder='Total Open Amount' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Baseline Create Date</p>
                            <input type="date" name="baseline_create_date" value={data.baseline_create_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="cust_payment_terms" value={data.cust_payment_terms} placeholder='Customer Payment Terms' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="invoice_id" value={data.invoice_id} placeholder='Invoice id' onChange={(e) => handleDataChange(e)} />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn'
                            onClick={() => handleAddData()}>Add</button>
                        <button className='popupBtn' onClick={() => setOpenAddPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add