import env from "../../Environment/Enviroment";
import axios, * as others from 'axios';
axios.defaults.withCredentials = true
//Property in panding state for notarize.
export const noteryPending = async (pending) => {
    return await axios.get(`${env.Backend_Url}/notary/get_all_pending`, pending, {
        withCredentials: true,
    })
}
//List of notary
export const notaryList = async (list) => {
    return await axios.get(`${env.Backend_Url}/notary/user/list`, list, {
        withCredentials: true,
    })
}
//List of notarize property
export const notarizedProperties = async (id, document) => {
    return await axios.post(`${env.Backend_Url}/notary/request/notarized/${id}`, document, {
        withCredentials: true,
    })
}
//List of Active property for notarize (new property)
export const noteryTodo = async (todo) => {
    return await axios.get(`${env.Backend_Url}/notary/get_all_underverification`, todo, {
        withCredentials: true,
    })
}
//Requseted property for verification
export const RequestforVerify = async (Property) => {
    return await axios.post(`${env.Backend_Url}/notary/request/verify/${Property}`, {
        withCredentials: true
    })
}
//List of verified property by notary
export const noteryVerified = async() => {
    return await axios.get(`${env.Backend_Url}/notary/get_all_verified`,{
        withCredentials:true,
    })
}
