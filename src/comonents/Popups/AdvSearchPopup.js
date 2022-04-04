import React from 'react'

const AdvSearchPopup = () => {
    return (
        <>
            <h3>Advance Search</h3>
            <div className="popupInputContainer" >
                <input type="text" name="DocumentId" placeholder='Document Id' />
                <input type="text" name="Invoiceid" placeholder='Invoice id' />
                <input type="text" name="CustomerNumber" placeholder='Customer Number' />
                <input type="text" name="BusinessYear" placeholder='Business Year' />
            </div>
        </>
    )
}

export default AdvSearchPopup