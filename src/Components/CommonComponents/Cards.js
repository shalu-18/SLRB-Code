import "../Assets/Styles/Cards.css";
import downloadicon from "../Assets/Images/downloadbtn.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pending from "../Assets/Images/painding.png"
import bid from "../Assets/Images/bid.png"
import Paid from "../Assets/Images/paid.png";
import Verifide from "../Assets/Images/aprovegreen.png";
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "./LandingPage"

const Cards_Component = (props) => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    console.log("Carddata", props.carddata.propertyTransaction)
    const Navigate = useNavigate()
    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    const Loginuserdata = JSON.parse(localStorage.getItem("Logindata"))

    useEffect(() => {
        if (props.carddata.propertyTransaction) {
            NotaryStatus()
        }
    }, [props])

    const NotaryStatus = async (data) => {
        console.log("asf", data)
        if (data?.current_status === "notarize") {
            return (
                <div class="row d-flex justify-content-between">
                    <div class="col"><img src={Verifide} /></div>
                    <div class="col text-end"><h6 >Verified </h6></div>
                </div>
            )
        }
        else if (data?.current_status === []) {
            return (
                <div class="row d-flex justify-content-between ">
                    <div class="col"><img src={pending} /></div>
                    <div class="col text-end"><h6 >Pending </h6></div>
                </div>
            )
        }
    }
    return (
        <>
            <div class="card border-0 text-start">
                <h6 class="my-card-title">{props.carddata.property?.property_type + " in " + props.carddata.property?.city}</h6>
                <p class="my-card-text">{props.carddata.property?.property_name}</p>
                <div style={{ position: "relative", width: "auto" }}>
                    <img src={`data:image/png;base64,${_arrayBufferToBase64(props.carddata.property?.images[0].data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} ></img>
                    <div>
                        <a class="btn " style={{ position: "absolute", right: 0, bottom: 0, background:Btnbgchange }} onClick={() => Navigate('/transaction', { state: { id: props.carddata.property._id } })}><img src={downloadicon} /></a>
                    </div>
                </div>
                {
                    props.carddata?.propertyTransaction?.current_status == "notarize" ? (
                        <div class="row d-flex justify-content-between">
                            <div class="col"><img src={Paid} /></div>
                            <div class="col text-end"><h6 >Paid </h6></div>
                        </div>)
                        : props.carddata?.propertyTransaction.length == 0 ?
                            (
                                <div class="row d-flex justify-content-between ">
                                    <div class="col"><img src={bid} /></div>
                                    <div class="col text-end"><h6>Bid</h6></div>
                                </div>
                            )
                            : props.carddata?.propertyTransaction?.current_status == "payment" ? (
                                <div class="row d-flex justify-content-between">
                                    <div class="col"><img src={Verifide} /></div>
                                    <div class="col text-end"><h6 >Approved</h6></div>
                                </div>
                            )
                                : props.carddata?.propertyTransaction?.current_status == "titleTransfer" ? (
                                    <div class="row d-flex justify-content-between">
                                        <div class="col"><img src={Verifide} /></div>
                                        <div class="col text-end"><h6 >Notarized</h6></div>
                                    </div>
                                ) : null
                }
            </div>
        </>
    )
}

export default Cards_Component;