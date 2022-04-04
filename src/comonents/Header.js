import React, { useRef, useState } from 'react'
import AddPopup from './Popups/AddPopup'
import EditPopup from './Popups/EditPopup'
import "./Header.css"
import AdvSearchPopup from './Popups/AdvSearchPopup'

const Header = () => {

    const advSearchTab = useRef(null)
    const addTab= useRef(null)
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
                    <AdvSearchPopup />
                    <div className="popupButtonContainer">
                        <button className='popupBtn' >Search</button>
                        <button className='popupBtn' onClick={() => closeTab(advSearchTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="Popup addPopup closeTab" ref={addTab}>
                <div className="container">
                    <AddPopup />
                    <div className="popupButtonContainer">
                        <button className='popupBtn' >Add</button>
                        <button className='popupBtn' onClick={() => closeTab(addTab)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="Popup editPopup closeTab" ref={editTab}>
                <div className="container">
                    <EditPopup />
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
        </>
    )
}


export default Header