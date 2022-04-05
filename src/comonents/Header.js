import React, { useEffect, useRef, useState } from 'react'
import { getTodaysDate } from '../utility/utilFunc'
import TableDataGrid from './TableDataGrid'
import { requestAddData, requestGetData } from '../utility/requestServer'
import "./Header.css"

const Header = () => {

    const advSearchTab = useRef(null)
    const addTab = useRef(null)
    const editTab = useRef(null)
    const deleteTab = useRef(null)

    const openTab = (tab) => {
        tab.current.classList.remove("closeTab")
        tab.current.classList.add("openTab")
    }
    const closeTab = (tab) => {
        tab.current.classList.remove("openTab")
        tab.current.classList.add("closeTab")
    }

    const today = getTodaysDate()

    const [custNumber, setCustNumber] = useState("")
    const [displayData, setDisplayData] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [data, setData] = useState({
        ClearDate: today,
        PostingDate: today,
        DocumentCreateDate: today,
        DueDate: today,
        BaselineCreateDate: today,
        BusinessCode: "",
        CustomerNumber: "",
        BusinessYear: "",
        DocumentId: "",
        InvoiceCurrency: "",
        DocumentType: "",
        Postingid: "",
        TotalOpenAmount: "",
        CustomerPaymentTerms: "",
        Invoiceid: "",
    })
    const { ClearDate, PostingDate, DocumentCreateDate, DueDate, BaselineCreateDate,
        BusinessCode, CustomerNumber, BusinessYear, DocumentId, InvoiceCurrency, DocumentType,
        Postingid, TotalOpenAmount, CustomerPaymentTerms, Invoiceid } = data

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        const data = await requestGetData()
        setDisplayData(data[0])
        setTotalCount(data[1])
    }

    const addData = async () => {
        console.log("Adding data.....");
        const d = await requestAddData(data)
    }

    useEffect(() => {

        getData()

    }, [])

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
                    <button className="btn" onClick={() => openTab(advSearchTab)}>ADVANCE SEARCH</button>
                </div>
                <input
                    type="text"
                    name="customerId"
                    id="customerId"
                    placeholder='Search Customer Id'
                />
                <div className="lastThreeButtonsContainer">
                    <button className="btn" onClick={() => openTab(addTab)}>ADD</button>
                    <button className="btn" onClick={() => openTab(editTab)}>EDIT</button>
                    <button className="btn" onClick={() => openTab(deleteTab)}>DELETE</button>
                </div>
            </div>

            <div className="Popup advSearchPopup closeTab" ref={advSearchTab}>
                <div className="container">
                    <h3>Advance Search</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="DocumentId" placeholder='Document Id' />
                        <input type="text" name="Invoiceid" placeholder='Invoice id' />
                        <input type="text" name="CustomerNumber" placeholder='Customer Number' />
                        <input type="text" name="BusinessYear" placeholder='Business Year' />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' >Search</button>
                        <button className='popupBtn' onClick={() => closeTab(advSearchTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="Popup addPopup closeTab" ref={addTab}>
                <div className="container">
                    <h3>Add</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="BusinessCode" value={BusinessCode} placeholder='Business Code' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="CustomerNumber" value={CustomerNumber} placeholder='Customer Number' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Clear Date</p>
                            <input type="date" name="ClearDate" value={ClearDate} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="BusinessYear" value={BusinessYear} placeholder='Business Year' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="DocumentId" value={DocumentId} placeholder='Document Id' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Posting Date</p>
                            <input type="date" name="PostingDate" value={PostingDate} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Document Create Date</p>
                            <input type="date" name="DocumentCreateDate" value={DocumentCreateDate} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Due Date</p>
                            <input type="date" name="DueDate" value={DueDate} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="InvoiceCurrency" value={InvoiceCurrency} placeholder='Invoice Currency' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="DocumentType" value={DocumentType} placeholder='Document Type' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="Postingid" value={Postingid} placeholder='Posting id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="TotalOpenAmount" value={TotalOpenAmount} placeholder='Total Open Amount' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Baseline Create Date</p>
                            <input type="date" name="BaselineCreateDate" value={BaselineCreateDate} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="CustomerPaymentTerms" value={CustomerPaymentTerms} placeholder='Customer Payment Terms' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="Invoiceid" value={Invoiceid} placeholder='Invoice id' onChange={(e) => handleDataChange(e)} />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' onClick={() => addData()}>Add</button>
                        <button className='popupBtn' onClick={() => closeTab(addTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="Popup editPopup closeTab" ref={editTab}>
                <div className="container">
                    <h3>Edit</h3>
                    <div className="popupInputContainer" >
                        <div className="inputPlaceholder">
                            <p>Invoice Currency</p>
                            <input type="text" name="InvoiceCurrency" />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Customer Payment Terms</p>
                            <input type="text" name="CustomerPaymentTerms" />
                        </div>
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' >Edit</button>
                        <button className='popupBtn' onClick={() => closeTab(editTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="Popup deletePopup closeTab" ref={deleteTab}>
                <div className="container">
                    <h3>Delete Record ?</h3>
                    <p>Are you sure you want to delete the record[s]?</p>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' >Delete</button>
                        <button className='popupBtn' onClick={() => closeTab(deleteTab)}>Cancel</button>
                    </div>
                </div>
            </div>
            {displayData && <TableDataGrid rows={displayData} />}
        </>
    )
}


export default Header