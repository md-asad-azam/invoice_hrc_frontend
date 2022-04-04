import React from 'react'

const EditPopup = () => {
    return (
        <>
            <h3>Edit</h3>
            <div className="popupInputContainer" >
                <div className="inputPlaceholder">
                    <p>Invoice Currency</p>
                    <input type="text" name="InvoiceCurrency" value="dummy" />
                </div>
                <div className="inputPlaceholder">
                    <p>Customer Payment Terms</p>
                    <input type="text" name="CustomerPaymentTerms" value="dummy" />
                </div>
            </div>
        </>
    )
}

export default EditPopup