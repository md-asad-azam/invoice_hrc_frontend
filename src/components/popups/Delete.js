import React from 'react'
import { requestDeleteData } from '../../utility/requestServer'

const Delete = (props) => {

    const { 
        selected,
        setShowAlert,
        setOpenDeletePopup,
    } = props

    const handleDeleteData = async () => {
        const res = await requestDeleteData(selected)
        setOpenDeletePopup(true)
        if (res.error) {
            setShowAlert({ open: true, message: res.error, type: "error" })
        } else {
            setShowAlert({ open: true, message: res.success, type: "success" })
        }
    }

  return (
    <>
        <div className="Popup deletePopup">
                <div className="container">
                    <h3>Delete Record ?</h3>
                    <p>Are you sure you want to delete the record[s]?</p>
                    <div className="popupButtonContainer">
                        <button className='popupBtn'
                            onClick={() => handleDeleteData()}>Delete</button>
                        <button className='popupBtn' onClick={() => setOpenDeletePopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Delete