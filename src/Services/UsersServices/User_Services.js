import env from "../../Environment/Enviroment";
import axios from "axios";
axios.defaults.withCredentials = true

// LandingPage Property list
export const LandingdataService = async (getallproperty) => {
    return await axios.get(`${env.Backend_Url}/get_all_property_details`, getallproperty)
}
//Signup
export const AddUser = async (newuser) => {
    return await axios.post(`${env.Backend_Url}/signup`, newuser, {
        withCredentials: true
    })
}
// Login
export const LoginService = async (user) => {
    return await axios.post(`${env.Backend_Url}/login`, user, {
        withCredentials: true
    })
}
//Logout
export const LogoutService = async (user) => {
    return await axios.get(`${env.Backend_Url}/logout`, user, {
        withCredentials: true
    })
}
//Reset password
export const resetPassword = async (email) => {
    console.log(email);
    return await axios.post(`${env.Backend_Url}/forgotpassword`, { email: email }, {
        withCredentials: true
    })
}
//Genrate new password
export const NewPassword = async (password, token) => {
    console.log(token);
    return await axios.post(`${env.Backend_Url}/password/reset/${token}`, password, {
        withCredentials: true
    })
}
//Updatepassword
export const updatePassword = async (updpassword) => {
    return await axios.post(`${env.Backend_Url}/password/update`, updpassword, {
        withCredentials: true
    })
}

//RequsetList
export const requestlistService = async (reqlist) => {
    return await axios.get(`${env.Backend_Url}/user/get_all_bid_property/bidding/property`, reqlist, {
        withCredentials: true
    })
}

//Add new property 
export const addproperty = async (Property) => {
    return await axios.post(`${env.Backend_Url}/add_property_details`, Property, {
        withCredentials: true
    })
}

//Single property details
export const getsingleproperty = async (Property) => {
    return await axios.get(`${env.Backend_Url}/get_single_property_details/${Property}`, {
        withCredentials: true
    })
}

// Get single user property
export const getSpecificUserProperty = async (Property) => {
    return await axios.get(`${env.Backend_Url}/user/add/property_details`, Property, {
        withCredentials: true
    })
}

//Listing property
export const Propertyplsceformarketing = async (id) => {
    return await axios.post(`${env.Backend_Url}/property/show/marketplace/${id}`, {
        withCredentials: true
    })
}
// Revert property
export const RevertProperty = async (id) => {
    return await axios.post(`${env.Backend_Url}/property/show/revert/${id}`, {
        withCredentials: true
    })
}
//Place bid to specific property
export const placebid = async (Property, id) => {
    return await axios.post(`${env.Backend_Url}/user/bidding/created/property/${id}`, Property, {
       withCredentials: true
    })
}
//List of buyers  bid on seller property
export const propertyBidDetails = async (id) => {
    return await axios.get(`${env.Backend_Url}/user/get_all_bid_property/bidding/property/${id}`, {
       withCredentials: true
    })
}
//Buyers deatails
export const getUserBidDetails = async (id) => {
    return await axios.get(`${env.Backend_Url}/user/bidded/property_details`, {
       withCredentials: true
    })
}

//Create Transactions
export const createTransaction = async (data) => {
    return await axios.post(`${env.Backend_Url}/user/bidding/transaction`,data, {
       withCredentials: true
    })
}
//Transactions details
export const getTransaction = async (id) => {
    return await axios.get(`${env.Backend_Url}/user/getTransaction/${id}`, {
       withCredentials: true
    })
}
//Update transactions detail
export const updateTransactionStatus = async (data) => {
    return await axios.post(`${env.Backend_Url}/user/updateTransactionStatus`,data, {
       withCredentials: true
    })
}




