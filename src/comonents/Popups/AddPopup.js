import React, { useRef, useState } from 'react'
import { getTodaysDate } from '../../utility/utilFunc'

const AddPopup = () => {

    const today = getTodaysDate()

    const [date, setDate] = useState({
        ClearDate: today,
        PostingDate: today,
        DocumentCreateDate: today,
        DueDate: today,
        BaselineCreateDate: today
    })
    const { ClearDate, PostingDate, DocumentCreateDate, DueDate, BaselineCreateDate } = date

    const handleDateChange = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h3>Add</h3>
            <div className="popupInputContainer" >
                <input type="text" name="BusinessCode" placeholder='Business Code' />
                <input type="text" name="CustomerNumber" placeholder='Customer Number' />
                <div className="inputPlaceholder">
                    <p>Clear Date</p>
                    <input type="date" name="ClearDate" value={ClearDate} onChange={(e) => handleDateChange(e)} />
                </div>
                <input type="text" name="BusinessYear" placeholder='Business Year' />
                <input type="text" name="DocumentId" placeholder='Document Id' />
                <div className="inputPlaceholder">
                    <p>Posting Date</p>
                    <input type="date" name="PostingDate" value={PostingDate} onChange={(e) => handleDateChange(e)} />
                </div>
                <div className="inputPlaceholder">
                    <p>Document Create Date</p>
                    <input type="date" name="DocumentCreateDate" value={DocumentCreateDate} onChange={(e) => handleDateChange(e)} />
                </div>
                <div className="inputPlaceholder">
                    <p>Due Date</p>
                    <input type="date" name="DueDate" value={DueDate} onChange={(e) => handleDateChange(e)} />
                </div>
                <input type="text" name="InvoiceCurrency" placeholder='Invoice Currency' />
                <input type="text" name="DocumentType" placeholder='Document Type' />
                <input type="text" name="Postingid" placeholder='Posting id' />
                <input type="text" name="TotalOpenAmount" placeholder='Total Open Amount' />
                <div className="inputPlaceholder">
                    <p>Baseline Create Date</p>
                    <input type="date" name="BaselineCreateDate" value={BaselineCreateDate} onChange={(e) => handleDateChange(e)} />
                </div>
                <input type="text" name="CustomerPaymentTerms" placeholder='Customer Payment Terms' />
                <input type="text" name="Invoiceid" placeholder='Invoice id' />
            </div>
        </>
    )
}

export default AddPopup