import React, { useEffect, useRef, useState } from 'react'
import { getTodaysDate } from '../utility/utilFunc'
import TableDataGrid from './TableDataGrid'
import CustomAlert from './CustomAlert'
import SearchIcon from '@mui/icons-material/Search';
import { requestAddData, requestAdvanceSearch, requestDeleteData, requestGetData, requestNormalSearch, requestUpdateData } from '../utility/requestServer'
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

    const [showAlert, setShowAlert] = useState({ open: false, message: "", type: "" })
    const [displayData, setDisplayData] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [selected, setSelected] = useState([])
    const [data, setData] = useState({
        clear_date: today,
        posting_date: today,
        document_create_date: today,
        due_in_date: today,
        baseline_create_date: today,
        business_code: "",
        cust_number: "",
        buisness_year: "",
        doc_id: "",
        invoice_currency: "",
        document_type: "",
        posting_id: "",
        total_open_amount: "",
        cust_payment_terms: "",
        invoice_id: "",
    })
    const {
        clear_date, posting_date, document_create_date, due_in_date, baseline_create_date,
        business_code, cust_number, buisness_year, doc_id, invoice_currency, document_type,
        posting_id, total_open_amount, cust_payment_terms, invoice_id, } = data

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        const res = await requestGetData()
        setDisplayData(res[0])
        setTotalCount(res[1])
    }

    const handleNormalSearch = async (e) => {
        e.preventDefault()
        const res = await requestNormalSearch(data)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setDisplayData(res)
        }
    }

    const handleAdvanceSearch = async () => {
        const res = await requestAdvanceSearch(data)
        closeTab(advSearchTab)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setDisplayData(res)
        }
    }

    const handleAddData = async () => {
        const res = await requestAddData(data)
        closeTab(addTab)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setShowAlert({ open: true, message: res.success, type: "success" })
        }
    }

    const handleEditData = async () => {
        const res = await requestUpdateData(data, selected)
        closeTab(editTab)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setShowAlert({ open: true, message: res.success, type: "success" })
        }
    }

    const handleDeleteData = async () => {
        const res = await requestDeleteData(selected)
        closeTab(deleteTab)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setShowAlert({ open: true, message: res.success, type: "success" })
        }
    }

    useEffect(() => {

        getData()

    }, [])

    return (
        <>
            {showAlert.open && <CustomAlert showAlert={showAlert} setShowAlert={setShowAlert} />}
            <div className="topHead">
                <div className="headerContainer">
                    <img
                        src="/abcProduct.png"
                        id='first'
                        alt="logo1"
                    />
                    <img
                        src="/logohighradiuscolor.png"
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
                    <form id='customerIdForm' onSubmit={(e) => handleNormalSearch(e)}>
                        <input
                            type="text"
                            name="cust_number"
                            id="customerId"
                            placeholder='Search Customer Id'
                            value={cust_number}
                            onChange={(e) => handleDataChange(e)}
                        />
                        <button type="submit"><SearchIcon className='searchIconSvg' /></button>
                    </form>
                    <div className="lastThreeButtonsContainer">
                        <button className="btn" onClick={() => openTab(addTab)}>ADD</button>
                        <button className="btn" onClick={() => openTab(editTab)}>EDIT</button>
                        <button className="btn" onClick={() => openTab(deleteTab)}>DELETE</button>
                    </div>
                </div>
            </div>

            {/* ADVANCE SEARCH POPUP */}
            <div className="Popup advSearchPopup closeTab" ref={advSearchTab}>
                <div className="container">
                    <h3>Advance Search</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="doc_id" value={doc_id} placeholder='Document Id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="invoice_id" value={invoice_id} placeholder='Invoice id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="cust_number" value={cust_number} placeholder='Customer Number' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="buisness_year" value={buisness_year} placeholder='Business Year' onChange={(e) => handleDataChange(e)} />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' onClick={() => handleAdvanceSearch()}>Search</button>
                        <button className='popupBtn' onClick={() => closeTab(advSearchTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* ADD POPUP */}
            <div className="Popup addPopup closeTab" ref={addTab}>
                <div className="container">
                    <h3>Add</h3>
                    <div className="popupInputContainer" >
                        <input type="text" name="business_code" value={business_code} placeholder='Business Code' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="cust_number" value={cust_number} placeholder='Customer Number' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Clear Date</p>
                            <input type="date" name="clear_date" value={clear_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="buisness_year" value={buisness_year} placeholder='Business Year' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="doc_id" value={doc_id} placeholder='Document Id' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Posting Date</p>
                            <input type="date" name="posting_date" value={posting_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Document Create Date</p>
                            <input type="date" name="document_create_date" value={document_create_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Due Date</p>
                            <input type="date" name="due_in_date" value={due_in_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="invoice_currency" value={invoice_currency} placeholder='Invoice Currency' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="document_type" value={document_type} placeholder='Document Type' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="posting_id" value={posting_id} placeholder='Posting id' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="total_open_amount" value={total_open_amount} placeholder='Total Open Amount' onChange={(e) => handleDataChange(e)} />
                        <div className="inputPlaceholder">
                            <p>Baseline Create Date</p>
                            <input type="date" name="baseline_create_date" value={baseline_create_date} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <input type="text" name="cust_payment_terms" value={cust_payment_terms} placeholder='Customer Payment Terms' onChange={(e) => handleDataChange(e)} />
                        <input type="text" name="invoice_id" value={invoice_id} placeholder='Invoice id' onChange={(e) => handleDataChange(e)} />
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn'
                            onClick={() => handleAddData()}>Add</button>
                        <button className='popupBtn' onClick={() => closeTab(addTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* EDIT POPUP */}
            <div className="Popup editPopup closeTab" ref={editTab}>
                <div className="container">
                    <h3>Edit</h3>
                    <div className="popupInputContainer" >
                        <div className="inputPlaceholder">
                            <p>Invoice Currency</p>
                            <input type="text" name="invoice_currency" value={invoice_currency} onChange={(e) => handleDataChange(e)} />
                        </div>
                        <div className="inputPlaceholder">
                            <p>Customer Payment Terms</p>
                            <input type="text" name="cust_payment_terms" value={cust_payment_terms} onChange={(e) => handleDataChange(e)} />
                        </div>
                    </div>
                    <div className="popupButtonContainer">
                        <button className='popupBtn' onClick={() => handleEditData()}>Edit</button>
                        <button className='popupBtn' onClick={() => closeTab(editTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* DELETE POPUP */}
            <div className="Popup deletePopup closeTab" ref={deleteTab}>
                <div className="container">
                    <h3>Delete Record ?</h3>
                    <p>Are you sure you want to delete the record[s]?</p>
                    <div className="popupButtonContainer">
                        <button className='popupBtn'
                            onClick={() => handleDeleteData()}>Delete</button>
                        <button className='popupBtn' onClick={() => closeTab(deleteTab)}>Cancel</button>
                    </div>
                </div>
            </div>
            {displayData && <TableDataGrid
                rows={displayData}
                selected={selected}
                setSelected={setSelected}
            />}
        </>
    )
}


export default Header