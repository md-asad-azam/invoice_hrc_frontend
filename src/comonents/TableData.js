import React, { useState } from 'react'
import "./TableData.css"

const TableData = ({ ele }) => {

    const [selectedList, setSelectedList] = useState([])

    const handleCheckBox = (e, ele) => {
        var arr = selectedList
    
        if (e.target.checked) {
          arr.push(ele)
          setSelectedList(arr)
        } else {
          arr = arr.filter((arrEle) => !(arrEle.sl_no === ele.sl_no))
          setSelectedList(arr)
        }
        console.log(arr);
        console.log(selectedList);
      }

    return (
        <tr className='tableRow'>
            <td className='checkBoxContainer'>
                <input
                    type="checkbox"
                    // checked={allChecked}
                    onChange={(e) => handleCheckBox(e, ele)}
                />
                {ele.sl_no}
            </td>
            <td>{ele.business_code}</td>
            <td>{ele.cust_number}</td>
            <td>{ele.clear_date}</td>
            <td>{ele.buisness_year}</td>
            <td>{ele.doc_id}</td>
            <td>{ele.posting_date}</td>
            <td>{ele.document_create_date}</td>
            <td>{ele.due_in_date}</td>
            <td>{ele.invoice_currency}</td>
            <td>{ele.document_type}</td>
            <td>{ele.posting_id}</td>
            <td>{ele.total_open_amount}</td>
            <td>{ele.baseline_create_date}</td>
            <td>{ele.cust_payment_terms}</td>
            <td>{ele.invoice_id}</td>
        </tr>
    )
}

export default TableData