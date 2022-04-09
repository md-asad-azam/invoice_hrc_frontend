import React from 'react'
import { requestUpdateData } from '../../utility/requestServer'

const Edit = (props) => {

    const { 
        selected,
        setShowAlert,
        data, setData,
        setOpenEditPopup,
    } = props

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleEditData = async () => {
        const res = await requestUpdateData(data, selected)
        setOpenEditPopup(true)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setShowAlert({ open: true, message: res.success, type: "success" })
        }
    }

    return (
        <>
            <div className="Popup editPopup">
                <div className="container">
                    <h3>Edit</h3>
                    <div className="popupInputContainer" >
                        <div className="inputPlaceholder">
                            <p>Invoice Currency</p>
                            <input type="text" name="invoice_currency" value={data.invoice_currency} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Customer Payment Terms</p>
                            <input type="text" name="cust_payment_terms" value={data.cust_payment_terms} onChange={(e) => handleDataChange(e)} />
                        </div>
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' onClick={() => handleEditData()}>Edit</button>
                        <button className='popupBtn' onClick={() => setOpenEditPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit