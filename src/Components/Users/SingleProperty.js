import '../Assets/Styles/Apartment_Details.css';
import MultiSlider from "../CommonComponents/MultiSlider";
import { useState, useEffect } from 'react';
import { getsingleproperty } from "../../Services/UsersServices/User_Services"
import { useLocation, useNavigate } from 'react-router-dom';
import line from "../Assets/Images/Line.png"
import Header from "../CommonComponents/Header";
import Footer from '../CommonComponents/Footer';

const SinglePropertyDetails = () => {
    const [Singleprop, setSingleprop] = useState()
    const { state } = useLocation()
    const navigate = useNavigate()
    const GetSinglePropertyData = async () => {
        try {
            await getsingleproperty(state.id).then(res => {
                setSingleprop(res.data.property_details)
            })
        }
        catch (err) {
            window.alert(err)
        }
    }

    useEffect(() => {
        if (!Singleprop) {
            GetSinglePropertyData();
        }
    }, [state, Singleprop])

    return (
        <div className=''>
            {window.location.pathname === "/guestproperty" ?
                <div  style={{ overflow: 'hidden' }}>
                    <Header />
                    <nav class="activetab ml-2">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a onClick={() => navigate(-1)}>Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Property details</li>
                        </ol>
                    </nav>
                </div>
                : ""}
            <div class="container-fluid" style={{ overflow: 'hidden' }}>
                <div class="row mt-2">
                    <div class="col-md-5">
                        <div class="row">
                            <h5 class="my-card-title">{Singleprop ? Singleprop.property_type : ""} for sale in {Singleprop ? Singleprop.city : ""}</h5>
                            <h5 class="my-card-text1 ">{Singleprop ? Singleprop.property_name : ""} {Singleprop ? Singleprop.country : ""}</h5>
                        </div>
                        <div class="">
                            <div class="row">
                                <div class="col">
                                    <h6 class="my-card-text1 ">Property Type:</h6>
                                    <h6 class="my-card-text1 ">Amount:</h6>
                                    <h6 class="my-card-text1 ">Bedrooms :</h6>
                                    <h6 class="my-card-text1 ">Bathrooms:</h6>
                                </div>
                                <div class="col">
                                    <h6 class="my-card-title">{Singleprop ? Singleprop.property_type : ""}</h6>
                                    <h6 class="my-card-title">{Singleprop ? Singleprop.property_amount : ""} BD</h6>
                                    <h6 class="my-card-title">{Singleprop ? Singleprop.bedrooms : ""}</h6>
                                    <h6 class="my-card-title">{Singleprop ? Singleprop.bathrooms : ""}</h6>
                                </div>
                            </div>
                        </div>
                        <h6 class="my-card-title mt-2">Address / Location</h6>
                        <h6 class="my-card-text1 ">{Singleprop ? Singleprop.street : ""}
                            {Singleprop ? Singleprop.city : ""} {Singleprop ? Singleprop.country : ""} {Singleprop ? Singleprop.pincode : ""}</h6>
                        <h6 class="my-card-title mt-2">Bank details</h6>
                        <h6 class="my-card-text1 ">{Singleprop ? Singleprop.account_holder_name : ""},{Singleprop ? Singleprop.bank_name : ""},{Singleprop ? Singleprop.account_no : ""},{Singleprop ? Singleprop.ifsc_code : ""}</h6>
                        <h6 class="my-card-title mt-2">Description</h6>
                        <h6 class="my-card-text1 ">{Singleprop ? Singleprop.description : ""}</h6>
                        <label class="my-card-title mt-2"> Property Consists :</label>
                        <li class="my-card-text1">Property Type: {Singleprop ? Singleprop.property_type : ""}</li>
                        <li class="my-card-text1">Number of Bedrooms: {Singleprop ? Singleprop.bedrooms : ""}</li>
                        <li class="my-card-text1">Number of Bathrooms: {Singleprop ? Singleprop.bathrooms : ""}</li>
                        <li class="my-card-text1">{Singleprop ? Singleprop.description : ""}</li>
                    </div>
                    <div class="col-md-2 text-center  Lineimg"><img src={line} class="line" /></div>
                    <div class="col-md-5">
                        < div class="row mt-2">
                            <h5 class="my-card-title px-3 mb-3">Property Images</h5>
                            < MultiSlider images={Singleprop ? Singleprop.images : []} Singleprop={Singleprop} />
                        </div>
                    </div>
                </div>
            </div>
            {window.location.pathname === "/guestproperty" ? <div id="footer" className='mt-5'><Footer /></div> : ""}
        </div>
    )
}

export default SinglePropertyDetails