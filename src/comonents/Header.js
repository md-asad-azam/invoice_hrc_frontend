import React, { useRef, useState } from 'react'
import { getTodaysDate } from "../utility/utilFunc"
import "./Header.css"

const Header = () => {

    const addTabContainer = useRef(null)
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

    const openAddTab = () => {
        addTabContainer.current.classList.remove("closeTab")
        addTabContainer.current.classList.add("openTab")
    }
    const closeAddTab = () => {
        addTabContainer.current.classList.remove("openTab")
        addTabContainer.current.classList.add("closeTab")
    }


    return (
        <>
            <div className="headerContainer">
                <img
                    src="https://w7.pngwing.com/pngs/829/807/png-transparent-sydney-australian-broadcasting-corporation-american-broadcasting-company-abc-local-radio-internet-radio-sydney-television-text-logo.png"
                    id='first'
                    alt="logo1"
                />
                <img
                    src="https://cdn-resources.highradius.com/resources/wp-content/uploads/2020/04/highradius-logo-3.png"
                    id='second'
                    alt="logo2"
                />
            </div>
            <div className="buttonsContainer">
                <div className="firstThreeButtonsContainer">
                    <button className="btn">PREDICT</button>
                    <button className="btn">ANALYTICS VIEW</button>
                    <button className="btn">ADVANCE SEARCH</button>
                </div>
                <input
                    type="text"
                    name="customerId"
                    id="customerId"
                    placeholder='Search Customer Id'
                />
                <div className="lastThreeButtonsContainer">
                    <button className="btn" onClick={openAddTab}>ADD</button>
                    <button className="btn" >EDIT</button>
                    <button className="btn" >DELETE</button>
                </div>
            </div>

            <div className="addPopup closeTab" ref={addTabContainer}>
                <div className="container">
                    <h3>Add</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="BusinessCode" placeholder='Business Code' />
                        <input type="text" name="CustomerNumber" placeholder='Customer Number' />
                        <input type="date" name="ClearDate" placeholder='Clear Date' value={ClearDate} onChange={(e) => handleDateChange(e)} />
                        <input type="text" name="BusinessYear" placeholder='Business Year' />
                        <input type="text" name="DocumentId" placeholder='Document Id' />
                        <input type="date" name="PostingDate" placeholder='Posting Date' value={PostingDate} onChange={(e) => handleDateChange(e)} />
                        <input type="date" name="DocumentCreateDate" placeholder='Document Create Date' value={DocumentCreateDate} onChange={(e) => handleDateChange(e)} />
                        <input type="date" name="DueDate" placeholder='Due Date' value={DueDate} onChange={(e) => handleDateChange(e)} />
                        <input type="text" name="InvoiceCurrency" placeholder='Invoice Currency' />
                        <input type="text" name="DocumentType" placeholder='Document Type' />
                        <input type="text" name="Postingid" placeholder='Posting id' />
                        <input type="text" name="TotalOpenAmount" placeholder='Total Open Amount' />
                        <input type="date" name="BaselineCreateDate" placeholder='Baseline Create Date' value={BaselineCreateDate} onChange={(e) => handleDateChange(e)} />
                        <input type="text" name="CustomerPaymentTerms" placeholder='Customer Payment Terms' />
                        <input type="text" name="Invoiceid" placeholder='Invoice id' />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' >Add</button>
                        <button className='popupBtn' onClick={closeAddTab}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Header