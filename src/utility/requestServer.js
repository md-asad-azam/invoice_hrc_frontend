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
    }
}

// Add Data
export const requestAddData = async (reqData) => {
    try {

        const res = await axios.get(`http://localhost:8080/HRC_internship/getMaxSlno`)
        reqData.sl_no = res.data + 1

        const link = `http://localhost:8080/HRC_internship/add`
        const { data } = await axios.post(link, reqData)

        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

// Delete Data
export const requestDeleteData = async (slno) => {

    try {

        const reqData = { sl_no: slno }

        const link = `http://localhost:8080/HRC_internship/delete`
        const { data } = await axios.post(link, reqData)

        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

// Advance Search
export const requestAdvanceSearch = async (reqData) => {

    try {

        const { cust_number, buisness_year, doc_id, invoice_id } = reqData

        const link = `http://localhost:8080/HRC_internship/fetch?page=${1}&resultPerPage=${10}&custNumber=${cust_number}&advSearch=${true}&businessYear=${buisness_year}&invoiceId=${invoice_id}&docId=${doc_id}`
        const { data } = await axios.get(link)

        return data

    } catch (error) {
        console.log(error);
    }
}

// Normal Search
export const requestNormalSearch = async (reqData) => {

    try {

        const { cust_number } = reqData

        const link = `http://localhost:8080/HRC_internship/fetch?page=${1}&resultPerPage=${10}&custNumber=${cust_number}`
        const { data } = await axios.get(link)

        return data

    } catch (error) {
        console.log(error);
    }
}