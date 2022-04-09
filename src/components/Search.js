import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { requestNormalSearch } from '../utility/requestServer';

const Search = (props) => {

    const { 
        page,
        setPage,
        customerId,
        rowsPerPage,
        setShowAlert,
        setTotalCount,
        setCustomerId,
        setDisplayData,
    } = props


    const handleNormalSearch = async (e) => {
        e.preventDefault()
        const res = await requestNormalSearch(customerId, page, rowsPerPage)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setDisplayData(res[0])
            setTotalCount(res[1])
        }
    }

    return (
        <>
            <form id='customerIdForm' onSubmit={(e) => handleNormalSearch(e)}>
                <input
                    type="text"
                    name="cust_number"
                    id="customerId"
                    placeholder='Search Customer Id'
                    value={customerId}
                    onChange={(e) => {
                        setCustomerId(e.target.value)
                        setPage(0)
                    }}
                />
                <button type="submit"><SearchIcon className='searchIconSvg' /></button>
            </form>
        </>
    )
}

export default Search