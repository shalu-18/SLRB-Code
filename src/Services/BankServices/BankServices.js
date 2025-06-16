import env from "../../Environment/Enviroment";
import axios from "axios";
axios.defaults.withCredentials = true

// Todo
export const banktodoservice = async () => {
    return await axios.get(`${env.Backend_Url}/bank/property/active_request`, {
        withCredentials: true
    })
}

// Pending
export const bankPending = async (pending) => {
    return await axios.get(`${env.Backend_Url}/bank/property/pending_request`, pending, {
        withCredentials: true,
    })
}

//Verify
export const bankVerified = async (verified) => {
    return await axios.get(`${env.Backend_Url}/bank/property/verified_request`, verified, {
        withCredentials: true,
    })
}

//request
// export const createRequest = async (property_id, property) => {
//     return await axios.post(`${env.Backend_Url}/bank/check/property/verify/${property_id}`, property, {
//         withCredentials: true,
//     })
// }

export const createRequest = async (property) => {
    return await axios.post(`${env.M2_Url}/verify`, property, {
        withCredentials: false,
    })
}