import axios from "axios"

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

export const requestAddData = async (reqData) => {
    try {

        // const link = ``
console.log(reqData);
        // const { data } = await axios.post(link, reqData)
return 0
        // return data;

    } catch (error) {
        console.log(error);
    }
}