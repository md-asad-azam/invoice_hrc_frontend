import React from 'react'
import { requestAdvanceSearch } from '../../utility/requestServer'

const AdvanceSearch = (props) => {

    const { 
        page,
        rowsPerPage,
        setShowAlert,
        setDisplayData,
        data, setData,
        setOpenAdvSearch,
    } = props

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleAdvanceSearch = async () => {
        const res = await requestAdvanceSearch(data, page, rowsPerPage)
        setOpenAdvSearch(false)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setDisplayData(res)
        }
    }

    return (
        <>
            <div className="Popup advSearchPopup openTab">
                <div className="container">
                    <h3>Advance Search</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="doc_id" value={data.doc_id} placeholder='Document Id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="invoice_id" value={data.invoice_id} placeholder='Invoice id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="cust_number" value={data.cust_number} placeholder='Customer Number' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="buisness_year" value={data.buisness_year} placeholder='Business Year' onChange={(e) => handleDataChange(e)} />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' onClick={() => handleAdvanceSearch()}>Search</button>
                        <button className='popupBtn' onClick={() => setOpenAdvSearch(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvanceSearch