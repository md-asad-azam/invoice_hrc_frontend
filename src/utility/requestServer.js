import axios from "axios"

// Get Data
export const requestGetData = async () => {
    const link = `http://localhost:8080/HRC_internship/fetch?page=${1}&resultPerPage=${200}`
    try {

        const { data } = await axios.get(link)

        const result = await axios.get(`http://localhost:8080/HRC_internship/count`)
        const count = result.data

        return [data, count]

    } catch (error) {
        console.log(error);
        return { error: "Something Went Wrong!!!" }
    }
}

// Add Data
export const requestAddData = async (reqData) => {

    for (const item in reqData) {
        if (reqData[item] === "")
            return { error: `Missing data for #${item}, Please fill up all fields.` }
    }

    try {

        const link = `http://localhost:8080/HRC_internship/add`
        const { data } = await axios.post(link, reqData)

        console.log(data);
        return data

    } catch (error) {
        console.log(error);
        return { error: "Something Went Wrong!!!" }
    }
}

// Update Data
export const requestUpdateData = async (reqData, slno) => {

    const {cust_payment_terms, invoice_currency} = reqData
    if(cust_payment_terms === "" || invoice_currency === ""){
        return { error: "Missing Data, Please fill up all fields." }
    }

    if (slno.length === 0) {
        return { error: "No Rows are selected to update!!!" }
    }

    try {
        const reqBody = {
            cust_payment_terms: reqData.cust_payment_terms,
            invoice_currency: reqData.invoice_currency,
            sl_no: slno
        }
        console.log(reqBody);

        const link = `http://localhost:8080/HRC_internship/update`
        const { data } = await axios.post(link, reqBody)

        return data

    } catch (error) {
        console.log(error);
        return { error: "Something Went Wrong!!!" }
    }

}

// Delete Data
export const requestDeleteData = async (slno) => {

    if (slno.length === 0) {
        return { error: "No Rows are selected to delete!!!" }
    }

    try {

        const reqData = { sl_no: slno }

        const link = `http://localhost:8080/HRC_internship/delete`
        const { data } = await axios.post(link, reqData)

        return data

    } catch (error) {
        console.log(error);
        return { error: "Something Went Wrong!!!" }
    }
}

// Advance Search
export const requestAdvanceSearch = async (reqData) => {

    const reqBody = { 
        cust_number: reqData.cust_number, 
        buisness_year: reqData.buisness_year, 
        doc_id: reqData.doc_id, 
        invoice_id: reqData.invoice_id 
    }

    for (const item in reqBody) {
        if (reqData[item] === "")
            return { error: `Missing data for #${item}, Please fill up all fields.` }
    }

    try {

        const link = `http://localhost:8080/HRC_internship/fetch?page=${1}&resultPerPage=${10}&custNumber=${reqBody.cust_number}&advSearch=${true}&businessYear=${reqBody.buisness_year}&invoiceId=${reqBody.invoice_id}&docId=${reqBody.doc_id}`
        const { data } = await axios.get(link)
        
        if(data.length === 0)
            return { error: "No Match found for this Search." }
            
        return data

    } catch (error) {
        console.log(error);
        return { error: "Something Went Wrong!!!" }
    }
}

// Normal Search
export const requestNormalSearch = async (reqData) => {

    try {

        const { cust_number } = reqData
        
        const link = `http://localhost:8080/HRC_internship/fetch?page=${1}&resultPerPage=${10}&custNumber=${cust_number}`
        const { data } = await axios.get(link)

        if(data.length === 0)
            return { error: "No Match found for this Search." }

        return data

    } catch (error) {
        console.log(error);
        return { error: "Something Went Wrong!!!" }
    }
}