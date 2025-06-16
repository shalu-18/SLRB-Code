import "../../Assets/Styles/Cards.css"
import "../../CommonComponents/DropDown"
import '../../Assets/Styles/Dropdown.css'
import { useState } from "react";
import { notarizedProperties } from "../../../Services/NotaryServices/Notary_services"
import Button_Component from "../../CommonComponents/Button";
import { FileDoneOutlined, HomeOutlined, PhoneOutlined, UserAddOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../../CommonComponents/LandingPage";

const SmartContract_Form = (props) => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    console.log("userdata", props.carddata)
    const Logindata = JSON.parse(localStorage.getItem("Logindata"))
    const initialValue = {
        transactionDocs: [],
    }
    const [fileName, setFileName] = useState()
    const [fileBuffer, setFileBuffer] = useState()
    const [uploadfile, setUploadfile] = useState()
    const [biduser, setbiduser] = useState()
    const [getBidamount, setGetBidamount] = useState()

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
        })
    }

    const captureFile = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        // console.log("file", file);
        setFileName(file.name)
        setFileBuffer(file)
        setUploadfile(file)
    }


    const notrizesProperty = async (e) => {
        e.preventDefault()
        let filebuf = await getBase64(fileBuffer)
        const formData = new FormData()
        console.log('fileBuffer', fileBuffer)
        formData.append("file", fileBuffer)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        notarizedProperties(props.txDetail.property_id, formData).then((res) => {
            toast.success("Property Verified Successfully.")
            // props.handleTabChange()

        })
        console.log('formData', formData)
    }

    let userinfo = props.carddata?.bid_user_details
    const checkBuyerdetails = () => {
        {
            userinfo?.map((x) => {
                if (x.bid_status == "approved") {
                    setGetBidamount(x.bid_amount)
                    // console.log("bidamount", x.bid_amount)
                    // console.log("datacoming",x.bid_user_id.uname)
                    setbiduser(x.bid_user_id)
                } else {
                    console.log("try again")
                }
            }
            )
        }



    }

    useEffect(() => {
        checkBuyerdetails()
    }, [props])
    return (
        <>
            <div class="container" style={props?.txDetail?.current_status != 'notarize' && props?.txDetail?.notarization_details?.notarization_details_status == 'pending' ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                <div class="col-md-10">
                    <div style={Logindata.role != "notary" ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                        <div class="row row-gy-2 aline-items-center justify-content-between">
                            <div class="row-md d-flex  justify-content-between pt-3 ">
                                <div class="col-md-6">
                                    <div class="upload-btn-wrapper">
                                        <button class="btn1">Upload</button>
                                        <input type="file" name="myfile" onChange={(event) => {
                                            captureFile(event);
                                        }} />

                                    </div>

                                </div>

                                <div class="col-lg-6 pt-1">
                                    {fileName ? <div class="d-flex text-center"><FileDoneOutlined style={{ color: 'green' }} /><h6 style={{ color: 'blue', fontSize: "0.9rem", fontWeight: '600' }}>{fileName}</h6></div> : ""}

                                </div>
                            </div>

                            <div class="mb-3 mt-3">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h6 >Seller Details:</h6>
                                        <div class="row">
                                            <div class="col d-flex gap-2"><h6 class="Text-sm-headding"><UserAddOutlined /></h6>
                                                <h6 class="Text-sm-headding">{props.carddata?.account_holder_name}</h6></div>
                                        </div>

                                        <div class="row" >
                                            <div class="col d-flex gap-2">
                                                <h6 class="Text-sm-headding"><PhoneOutlined /></h6>
                                                <div class="Text-sm-headding">{props.carddata?.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <h6>Buyer Details:</h6>
                                        <div class="row">
                                            <div class="col d-flex gap-2"><h6 class="Text-sm-headding"><UserAddOutlined /></h6>
                                                <h6 class="Text-sm-headding">{biduser?.uname}</h6>
                                            </div>
                                        </div>
                                        <div class="row" >
                                            <div class="col d-flex gap-2"><h6 class="Text-sm-headding"><PhoneOutlined /></h6>
                                                <div class="Text-sm-headding">{biduser?.phone}</div></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="container p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                                <div class="d-flex gap-2"> <HomeOutlined /> <h6>Sell property Details:</h6></div>
                                <div class="row" >
                                    <div class="col"> <h6 class="Text-sm-headding">Property Id:</h6></div>
                                    <div class="col"><h6 class="Text-sm-headding">{props.txDetail?.property_id}</h6></div>
                                </div>
                                <div class="row" >
                                    <div class="col"><h6 class="Text-sm-headding">Property Amount:</h6></div>
                                    <div class="col"><h6 class="Text-sm-headding">{props.carddata?.property_amount} BD</h6></div>
                                </div>
                                <div class="row" >
                                    <div class="col"> <h6 class="Text-sm-headding">Bid Amount:</h6></div>
                                    <div class="col"><h6 class="Text-sm-headding">{getBidamount} BD</h6></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {Logindata.role === "notary" ? <Button_Component
                        className={"btn  btn-sm  float-end mt-5"}
                        text={"Notarize"}
                        onClick={notrizesProperty}
                        style={
                            uploadfile ? {
                                background:Btnbgchange,
                                color: "white",
                                border: "none",
                            }
                                :
                                {
                                    backgroundColor: "gray",
                                    color: "white",
                                    border: 'none',
                                    cursor: "not-allowed"
                                }
                        }
                    /> : null}
                </div>
            </div>


        </>
    )
}

export default SmartContract_Form;