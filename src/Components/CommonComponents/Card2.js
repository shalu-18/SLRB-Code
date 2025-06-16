import "../Assets/Styles/Cards.css";
import Button_Component from "./Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { propertyBidDetails } from "../../Services/UsersServices/User_Services";
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "./LandingPage"

const Card2_Component = (props) => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const Logindata = JSON.parse(localStorage.getItem("Logindata"))
    const [Singleprop, setSingleprop] = useState()
    const { state } = useLocation()
    const Navigate = useNavigate()

    console.log("dataincoing,", props.txDetail)

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const GetSinglePropertyData = async () => {
        try {
            await propertyBidDetails(state?.id).then(res => {
                setSingleprop(res.data.all_property_details)
                // console.log("cominng", res.data.all_property_details)
                console.log("Logindata", Logindata._id)
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
    }, [props, state])

    // console.log("data from transaction", Singleprop)
    return (
        <>
            <div class="container">
                <div class="col-md-10">
                    <div class="card-body ">
                        <h6 class="my-card-title">{props.carddata?.property_type + "in " + props.carddata?.city}</h6>
                        <p class="my-card-text">{props.carddata?.property_name}</p>
                        <div style={{ position: "relative", width: "auto" }}>
                            <img src={`data:image/png;base64,${_arrayBufferToBase64(props.carddata?.images[0].data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} ></img>
                        </div>
                        <br />
                        <h6 class="card-title">Property Amount: {props.carddata?.property_amount} BD</h6>
                        <h6 class="card-title">Bid Amount: {props.txDetail?.bid_amount} BD</h6>
                        <h6 class="pt-2 my-card-title ">Seller </h6>
                        <span class="my-card-text">{props.carddata?.account_holder_name}</span>
                        <br />
                        <div class="my-card-text">{props.carddata?.street}, {props.carddata?.city}, {props.carddata?.pincode}, {props.carddata?.country}</div>
                        <span class="my-card-text">{props.carddata?.contact_no}</span>
                        {props.carddata?.bid_user_details.map((data) => {
                            return (
                                <> {
                                    data.bid_status == "bid" ? <h6 class="pt-3">Approved Sale amount {data.bid_amount} BD</h6> : ""
                                }
                                </>
                            )
                        })}
                        {Singleprop?.user_id === Logindata?._id ?
                            <div class="mt-2">
                                <h6 className="text-secondary">Waiting for Buyer to make the Transaction...</h6>
                            </div> :
                            <div class="d-flex justify-content-end align-items-content-end mt-2">
                                <Button_Component className={"btn btn-md btn-danger"} text={"Payment Details"} style={{ background: Btnbgchange, border: 'none' }} onClick={() => Navigate('/payment', {
                                    state: {
                                        id: props?.carddata?._id
                                    }
                                })} />
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card2_Component;