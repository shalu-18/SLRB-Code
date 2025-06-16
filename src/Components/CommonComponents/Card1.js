import "../Assets/Styles/Cards.css";
import downloadicon from "../Assets/Images/downloadbtn.png"
import defaultHome from "../Assets/Images/defaultHome.jpg"
import { useNavigate } from "react-router-dom";
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom } from "./LandingPage"

const Card1_Component = (props) => {
    let Navigate = useNavigate()
    const [buttonbackcolor] = useAtom(PrimeryColorSeclectorAtom)
    const Logindata = JSON.parse(localStorage.getItem("Logindata"))
    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }


    const reddownloadbtn = () => {
        if (window.location.pathname =='/myproperties') {
            Navigate('/requestlist',{
                state: {
                    id: props.carddata._id
                }
            })
        }
        else if (Logindata === null || Logindata.email === "notary@gmail.com"||Logindata.email ==="admin@rapidqube.com") {
            console.log(123333)
                Navigate('/guestproperty',{
                    state: {
                        id: props.carddata._id
                    }
                })
            }
            else {
                console.log(123)
                Navigate('/singpropertydetail',{
                    state: {
                        id: props.carddata._id
                    }
                })
            }
    }
    return (
        <>
            <div class="card border-0">
                <h6 class="my-card-title ">{props.carddata.property_type} in  {props.carddata.city}</h6>
                <h6 class="my-card-text">{props.carddata.property_name}</h6>
                <div style={{ position: "relative", width: "auto" }}>
                    <img src={props.carddata.images[0]?`data:image/png;base64,${_arrayBufferToBase64(props.carddata.images[0].data)}`:defaultHome} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} ></img>
                    <div>
                        <a class="btn " style={{ position: "absolute", right: 0, bottom: 0 , background:buttonbackcolor}} onClick={() => reddownloadbtn()}><img src={downloadicon} /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card1_Component;