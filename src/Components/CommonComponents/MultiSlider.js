import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Button_Component from "../CommonComponents/Button";
import { Modal } from 'antd';
import TextFieldCom from "../../Components/CommonComponents/TextField";
import { placebid } from '../../Services/UsersServices/User_Services';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "./LandingPage"

const MultiSlider = (props) => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenforlogin, setisModalOpenforlogin] = useState(false);
    const Logindata = JSON.parse(localStorage.getItem("Logindata"))
    const [bidvaluevalidation, setBidvaluevalidation] = useState(false)

    const Navigate = useNavigate()

    const initialValue = {
        Place_your_bid: ""
    }
    const [inputData, setInputData] = useState(initialValue);

    const showModal = () => {
        if (localStorage.getItem("Logindata") === null) {
            showModalLogin()
        } else {
            setIsModalOpen(true);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log("props", props)

    //Login Modal

    const showModalLogin = () => {
        setisModalOpenforlogin(true)
    }

    const handleOkLogin = () => {
        setisModalOpenforlogin(false);
    };

    const handleCancelLogin = () => {
        setisModalOpenforlogin(false);
    };

   

    const Placebidfun = (e) => {
        e.preventDefault();
        if (!bidvaluevalidation) {
            placebid({ bid_amount: inputData.Place_your_bid }, props.Singleprop._id).then(res => {
             console.log("Place bid ", res.data.success)
                if (res.data.success === true) {
                    toast.success("Bid Placed Successfully.")
                     handleCancel()
                    Navigate("/myproperties")
                }
            }).catch((error) => {
                toast.error(error.response.data.message, { position: "top-right", autoClose: 5000 })
            })

        }
        

      
    }

    const inputhandler = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
        console.log("bidddin", e.target.value)
        if(e.target.value <= props.Singleprop.property_amount){

            setBidvaluevalidation(true)
        }
        else{
            setBidvaluevalidation(false)
        }
    }

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col mb-5">
                        {props.images.map(( index) => {
                            return (<>
                                <div className="slider " key={index}  >
                                    <img class="sliderimg img-fluid" src={`data:image/png;base64,${_arrayBufferToBase64(props.images[0].data)}`} />
                                    {window.location.pathname === "/guestproperty" || Logindata._id === props.Singleprop?.user_id ? null :
                                        <div class="row pt-2 ">
                                            <div class="col text-end">
                                                <button type="button" style={{background:Btnbgchange, border:'none'}} class="btn  btn-sm" onClick={showModal}>Place Bid</button>

                                            </div>
                                        </div>

                                    }
                                </div>
                            </>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* Place Bid */}
            <Modal title="Place Your Bids" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                <div className='row row-md-12 d-flex justify-content-center align-items-center '>
                    <div class="col col-sm-12 mb-3 pt-2">  
                    <TextFieldCom
                        type={"Place_your_bid"}
                        id={"Place_your_bid"}
                        name={"Place_your_bid"}
                        value={inputData.Place_your_bid}
                        onChange={inputhandler}
                        className="form-control"
                        placeholder={"Place your bid"}
                        arialabel={"Place_your_bid"}
                    />
                    </div>
                    {bidvaluevalidation === true? <h6 class="my-error-text">Bid Amount should not less then property amount</h6>:""}
                    <div class="col d-flex flex-row-reverse ">
                        <Button_Component className={"btn "} style={{background:Btnbgchange, border:'none'}}  onClick={(e) => Placebidfun(e)} text={"Submit"} />
                    </div>
                </div>
            </Modal>

         

        </>
    )
}


export default MultiSlider;