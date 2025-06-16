import Card2_Component from "../../CommonComponents/Card2";
import SmartContract_Form from "./Smartcontractform";
import Transfer_Form from "../Transaction/TransferForm"
import React, { useEffect, useState } from "react";
import aprove from "../../Assets/Images/aprovegreen.png";
import notready from "../../Assets/Images/notreadyicon.png";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../Assets/Styles/CommanStyle.css';
import Header from '../../CommonComponents/Header';
import { propertyBidDetails, getTransaction } from "../../../Services/UsersServices/User_Services";

const Transactionsmain_page = () => {
    const [Singleprop, setSingleprop] = useState()
    const [txDetail, setTxDetail] = useState()
    const { state } = useLocation()
    const navigate = useNavigate()
    const Logindata = JSON.parse(localStorage.getItem("Logindata"))

    const GetSinglePropertyData = async () => {
        try {
            await propertyBidDetails(state.id).then(res => {
                console.log("transaction data", res)
                setSingleprop(res.data.all_property_details)
            })
        }
        catch (err) {
            window.alert(err)
        }
    }

    const GetSinglePropertyTransactionData = async () => {
        try {
            await getTransaction(state.id).then(res => {
                console.log("txdata", res)
                setTxDetail(res.data.result)
            })
        }
        catch (err) {
            window.alert(err)
        }
    }

    useEffect(() => {
        if (!Singleprop) {
            GetSinglePropertyData();
            GetSinglePropertyTransactionData()
        }
    }, [])

    return (
        <>
            <Header />
            <div class="mt-2" style={{ overflow: "hidden" }}>
                <nav class="activetab ml-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a onClick={() => navigate(-1)}>Properties</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Transactions</li>
                    </ol>
                </nav>
                {
                    txDetail ?
                        <div class="row mt-3">
                            <div class="col-md-4">
                                <div class="container" style={txDetail?.current_status == 'payment' || txDetail?.sale_details?.payment_details_status == 'pending' ? {} : { pointerEvents: "none", opacity: "0.4" }}>
                                    <div class="row">
                                        <div class="col my-card-text">A. Sale details</div>
                                        <div class="col">
                                            <div class="d-flex gap-2">
                                                <span><img src={txDetail?.sale_details?.payment_details_status != 'pending' ? aprove : notready} alt="aprove" /></span>
                                                <h6 class="my-card-text pt-1">{txDetail?.current_status == 'payment' || txDetail?.payment_details_status == 'pending' ? "Not Ready" : "Approved"}</h6></div>
                                        </div>
                                    </div>
                                    <div class="row mt-2 ">
                                        <Card2_Component carddata={Singleprop} />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="container" style={txDetail?.current_status != 'notarize' && txDetail?.notarization_details?.notarization_details_status == 'pending' ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                                    <div class="row">
                                        <div class="col my-card-text">B. Notarization</div>
                                        <div class="col">
                                            <div class="d-flex gap-2">
                                                <span>
                                                    <img src={txDetail?.notarization_details?.notarization_details_status != 'pending' ? aprove : notready} alt="aprove" />
                                                </span>
                                                <h6 class="my-card-text pt-1">{txDetail?.current_status == 'notarize' || txDetail?.notarization_details?.notarization_details_status == 'pending' ? "Not Ready" : "Approved"}</h6></div>
                                        </div>
                                        <div class="row mt-2 ">
                                            <SmartContract_Form txDetail={txDetail} carddata={Singleprop} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="container" style={txDetail?.current_status != 'titleTransfer' && txDetail?.title_transfer?.title_transfer_status == 'pending' ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                                    <div class="row">
                                        <div class="col my-card-text">C. Title Transfer</div>
                                        <div class="col">
                                            <div class="d-flex gap-2">
                                                <span><img src={txDetail?.title_transfer?.title_transfer_status != 'pending' ? aprove : notready} alt="aprove" /></span>
                                                <h6 class="my-card-text pt-1">{txDetail?.current_status == 'titleTransfer' || txDetail?.title_transfer?.title_transfer_status == 'pending' ? "Not Ready" : "Approved"}</h6></div>
                                        </div>
                                    </div>
                                    <div class="row mt-2" >
                                        <Transfer_Form txDetail={txDetail} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="ml-2">
                            <h6>Waiting for Seller to approve your bid...</h6>
                        </div>
                }
            </div>
        </>
    )
}

export default Transactionsmain_page;