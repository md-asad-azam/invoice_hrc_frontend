import axios from "axios"

const baseUrl = "http://localhost:8080/HRC_internship"
const serverErrorMsg = "Something Went Wrong!!!"

// Get Data
export const requestGetData = async (page = 0, rowsPerPage = 10) => {

    const link = baseUrl + `/fetch?page=${page}&resultPerPage=${rowsPerPage}`
    const countLink = baseUrl + `/count`
    try {

        const { data } = await axios.get(link)
        const result = await axios.get(countLink)
        const count = result.data
        return [data, count]

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}

// Add Data
export const requestAddData = async (reqData) => {

    for (const item in reqData) {
        if (reqData[item] === "")
            return { error: `Missing data for #${item}, Please fill up all fields.` }
    }

    try {

        const link = baseUrl + `/add`
        const { data } = await axios.post(link, reqData)
        return data

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}

// Update Data
export const requestUpdateData = async (reqData, slno) => {

    const { cust_payment_terms, invoice_currency } = reqData
    if (cust_payment_terms === "" || invoice_currency === "") {
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

        const link = baseUrl + `/update`
        const { data } = await axios.post(link, reqBody)
        return data

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}

// Delete Data
export const requestDeleteData = async (slno) => {

    if (slno.length === 0) {
        return { error: "No Rows are selected to delete!!!" }
    }

    try {

        const reqData = { sl_no: slno }
        const link = baseUrl + `/delete`
        const { data } = await axios.post(link, reqData)
        return data

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}


// Normal Search
export const requestNormalSearch = async (reqData, page = 0, rowsPerPage = 10) => {

    try {

        const link = baseUrl + `/fetch?page=${page}&resultPerPage=${rowsPerPage}&custNumber=${reqData}`
        const countLink = baseUrl + `/count?custNumber=${reqData}`

        const { data } = await axios.get(link)  //Getting data
        const result = await axios.get(countLink)   //Getting total count or matched result
        const count = result.data

        if (data.length === 0) {
            return { error: "No Match found for this Search." }
        }

        return [data, count]
    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}

// Advance Search
export const requestAdvanceSearch = async (reqData, page = 0, rowsPerPage = 10) => {

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

        const link = baseUrl + `/fetch?page=${page}&resultPerPage=${rowsPerPage}&custNumber=${reqBody.cust_number}&advSearch=${true}&businessYear=${reqBody.buisness_year}&invoiceId=${reqBody.invoice_id}&docId=${reqBody.doc_id}`
        const { data } = await axios.get(link)

        if (data.length === 0)
            return { error: "No Match found for this Search." }

        return data

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}

// Analytical Data
export const requestAnalytialData = async (reqData) => {

    const link = baseUrl + `/getAnalytics`

    try {

        const { data } = await axios.post(link, reqData)
        return data

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}

// Aging Bucket
export const requestAgingBucket = async (reqData) => {

    const link = `http://127.0.0.1:5000/get_prediction`
    const reqBody = { data: reqData }
    let update = []
    try {

        const { data } = await axios.post(link, reqBody)

        // processing data to update in DB
        reqData.map((id, i) => {
            data.map(d => {
                if (parseInt(d.doc_id) === id)
                    reqData.splice(i, 1)
            })
        })
        data.map(d => {
            d.doc_id = parseInt(d.doc_id)
            update.push(d)
        })
        reqData.map(id => update.push({ aging_bucket: "N/A", doc_id: id }))

        const res = await axios.post(baseUrl + "/UpdatePrediction", update)
        return res.data

    } catch (error) {
        console.log(error);
        return { error: serverErrorMsg }
    }
}