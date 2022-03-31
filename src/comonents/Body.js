import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import "./Body.css"
import TableData from './TableData';


const Body = () => {

  const [displayData, setDisplayData] = useState([])
  const [page, setPage] = useState(1)
  const [resultPerPage, setResultPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [allChecked, setAllChecked] = useState(false)

  const getData = async () => {

    const link = `http://localhost:8080/HRC_internship/getAllData?page=${page}&resultPerPage=${resultPerPage}`
    try {

      const { data } = await axios.get(link)
      setDisplayData(data)

      const result = await axios.get(`http://localhost:8080/HRC_internship/countData`)
      setTotalCount(result.data)

    } catch (error) {
      console.log(error);
    }

  }

  const handleResultPerPageChange = (e) => {
    setResultPerPage(e.target.value)
    getData()
  }
  const prevPageHandler = () => {
    setPage(page - 1)
  }
  const nextPageHandler = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    getData()
  }, [resultPerPage, page])

  var countFrom = 0, countTill = 0
  countFrom = (page - 1) * resultPerPage + 1
  countTill = page * resultPerPage
  return (
    <>
      <div className='bodyContainer'>
        <div className="tableContainer">
          <table>
            <thead className='tableHeading'>
              <tr>
                <th className='checkBoxContainer'><input type="checkbox" onChange={(e) => setAllChecked(e.target.checked)} /> Sl no</th>
                <th>Business Code</th>
                <th>Customer Number</th>
                <th>Clear Date</th>
                <th>Business Year</th>
                <th>Document Id</th>
                <th>Posting Date</th>
                <th>Document Create Date</th>
                <th>Due Date</th>
                <th>Invoice Currency</th>
                <th>Document Type</th>
                <th>Posting id</th>
                <th>Total Open Amount</th>
                <th>Baseline Create Date</th>
                <th>Customer Payment Terms</th>
                <th>Invoice id</th>
              </tr>
            </thead>

            <tbody>
              {displayData.map((ele, i) => <TableData ele={ele} key={i} />)}
            </tbody>
          </table>
        </div>

        <div className="paginationContainer">
          <div className="resPerPage">
            <p>Rows Per Page: </p>
            <select name="resultPerPage" onChange={(e) => { handleResultPerPageChange(e) }}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="buttonContainer">
            <button
              className="prevPage"
              onClick={prevPageHandler}
              disabled={page == 1}><ChevronLeftIcon /></button>

            <p className='pageDetails'>
              {countFrom} - {countTill > totalCount ? totalCount : countTill} of {totalCount}
            </p>

            <button
              className="nextPage"
              onClick={nextPageHandler}
              disabled={countTill > totalCount} ><ChevronRightIcon /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Body