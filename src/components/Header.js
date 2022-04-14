import "../css/Header.css"
import Search from './Search';
import Add from './popups/Add';
import Edit from './popups/Edit';
import Analytics from './popups/Analytics'
import Delete from './popups/Delete';
import CustomAlert from './CustomAlert'
import TableDataGrid from './Table/TableDataGrid'
import React, { useEffect, useState } from 'react'
import AdvanceSearch from './popups/AdvanceSearch';
import { getTodaysDate } from '../utility/getDate'
import RefreshIcon from '@mui/icons-material/Refresh';
import { requestAgingBucket, requestGetData, requestNormalSearch } from '../utility/requestServer'


const Header = () => {

    const today = getTodaysDate()

    const [page, setPage] = useState(0);
    const [change, setChange] = useState("") //this state is changed to call useEffect whenever we want
    const [selected, setSelected] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [customerId, setCustomerId] = useState("")
    const [displayData, setDisplayData] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showAlert, setShowAlert] = useState({ open: false, message: "", type: "" })

    // States to manage the popup open/close state of popups
    const [openAdvSearch, setOpenAdvSearch] = useState(false)
    const [openAddPopup, setOpenAddPopup] = useState(false)
    const [openEditPopup, setOpenEditPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [openAnalyticsPopup, setOpenAnalyticsPopup] = useState(false)

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

    const refreshData = () => {
        setPage(0)
        setSelected([])
        setTotalCount(0)
        setDisplayData([])
        setCustomerId("")
        getData()
    }

    const getPrediction = async () => {
        if (selected.length === 0) {
            setShowAlert({ open: true, message: "No Rows Selected To Predict !", type: "error" })
        } else {
            let docId = selected.map(item => {
                let doc = displayData.find(d => d.sl_no === item)
                return parseInt(doc.doc_id)
            })
            const res = await requestAgingBucket(docId)
            if (res.error) {
                setShowAlert({ open: true, message: res.error, type: "error" })
            } else {
                setShowAlert({ open: true, message: res.success, type: res.type })
                getData() //Fetching updated data
            }
        }
    }

    const getData = async () => {
        let res
        if (customerId !== "") {
            res = await requestNormalSearch(customerId, page, rowsPerPage)
        } else {
            res = await requestGetData(page, rowsPerPage)
        }

        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setDisplayData(res[0])
            setTotalCount(res[1])
        }
    }

    useEffect(() => {

        getData()

    }, [page, rowsPerPage, change])

    return (
        <>
            {showAlert.open && <CustomAlert showAlert={showAlert} setShowAlert={setShowAlert} />}
            
            <div className="topHead">
                <div className="headerContainer">
                    <img src="/abcProduct.png" id='first' alt="logo1" />
                    <img src="/logohighradiuscolor.png" id='second' alt="logo2" />
                </div>
                <div className="buttonsContainer">
                    <div className="firstThreeButtonsContainer">
                        <button className="btn" onClick={() => getPrediction()}>PREDICT</button>
                        <button className="btn" onClick={() => setOpenAnalyticsPopup(true)}>ANALYTICS VIEW</button>
                        <button className="btn" onClick={() => setOpenAdvSearch(true)}>ADVANCE SEARCH</button>
                        <button className="btn refreshBtn" onClick={() => refreshData()}><RefreshIcon /></button>
                    </div>
                    <Search
                        page={page}
                        setPage={setPage}
                        customerId={customerId}
                        rowsPerPage={rowsPerPage}
                        setShowAlert={setShowAlert}
                        setCustomerId={setCustomerId}
                        setTotalCount={setTotalCount}
                        setDisplayData={setDisplayData}
                    />
                    <div className="lastThreeButtonsContainer">
                        <button className="btn" onClick={() => setOpenAddPopup(true)}>ADD</button>
                        <button className="btn" onClick={() => setOpenEditPopup(true)}>EDIT</button>
                        <button className="btn" onClick={() => setOpenDeletePopup(true)}>DELETE</button>
                    </div>
                </div>
            </div>

            {openAdvSearch && <AdvanceSearch
                page={page}
                data={data}
                setData={setData}
                rowsPerPage={rowsPerPage}
                setShowAlert={setShowAlert}
                setDisplayData={setDisplayData}
                setOpenAdvSearch={setOpenAdvSearch}
            />}

            {openAddPopup && <Add
                data={data}
                setData={setData}
                setShowAlert={setShowAlert}
                setOpenAddPopup={setOpenAddPopup}
            />}

            {openEditPopup && <Edit
                data={data}
                setData={setData}
                selected={selected}
                setChange={setChange}
                setShowAlert={setShowAlert}
                setOpenEditPopup={setOpenEditPopup}
            />}

            {openDeletePopup && <Delete
                selected={selected}
                setChange={setChange}
                setShowAlert={setShowAlert}
                setOpenDeletePopup={setOpenDeletePopup}
            />}

            {displayData && <TableDataGrid
                displayData={displayData}
                totalCount={totalCount}
                selected={selected}
                setSelected={setSelected}
                setDisplayData={setDisplayData}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />}
            {openAnalyticsPopup && <Analytics
                today={today}
                setOpenAnalyticsPopup={setOpenAnalyticsPopup}
            />}

        </>
    )
}

export default Header