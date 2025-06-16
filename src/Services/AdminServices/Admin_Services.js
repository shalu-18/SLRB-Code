import env from "../../Environment/Enviroment";
import axios, * as others from 'axios';
axios.defaults.withCredentials = true

//List of verified property by slrb admin
export const adminVerified = async () => {
    return await axios.get(`${env.Backend_Url}/admin/get_all_verified`, {
        withCredentials: true,
    })
}
//Sell property details
export const transferProperties = async (id, data) => {
    return await axios.post(`${env.Backend_Url}/transfer_property/${id}`, data, {
        withCredentials: true,
    })
}
//Seller requested property for listing
export const AddPropertyToLedger = async (Property) => {
    return await axios.post(`${env.Backend_Url}/user/add/AddPropertyToLedger/${Property}`, {
        withCredentials: true
    })
}
//Admin admmin property for verification
export const adminTodo = async () => {
    return await axios.get(`${env.Backend_Url}/admin/get_all_pending`, {
        withCredentials: true,
    })
}
//Admin customize page for text and button color adding to Database
export const Colorchanging = async (colors) => {
    console.log("co", colors)
    return await axios.post(`${env.Backend_Url}/admin/change/color`, colors, {
        withCredentials: true,
    })
}
//Header Brandlogo add in db
export const Brandlogo = async (data) => {
    return await axios.post(`${env.Backend_Url}/admin/upload/brand/logo/image`, data, {
        withCredentials: true,
    })
}
//Header Brandlogo get from db
export const GetBrandlogfromdb = async () => {
    return await axios.get(`${env.Backend_Url}/admin/getall/brand/logo/image`, {
        withCredentials: true
    })
}

export const CountryLogo = async (data) => {
    return await axios.put(`${env.Backend_Url}/admin/update/country/logo/image`, data, {
        withCredentials: true,
    })
}

//Header Country logo add in db
export const GetColorfromdb = async () => {
    return await axios.get(`${env.Backend_Url}/admin/get/color`, {
        withCredentials: 'true'
    })
}
//Header Country logo get from db
export const GetCountrylogofromdb = async () => {
    return await axios.get(`${env.Backend_Url}/admin/getall/country/logo/image`, {
        withCredentials: 'true'
    })
}