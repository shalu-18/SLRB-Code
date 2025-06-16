import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Assets/Styles/CommanStyle.css";
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"
import { updateTransactionStatus,getTransaction } from "../../Services/UsersServices/User_Services";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { notaryList } from "../../Services/NotaryServices/Notary_services"
import DropDown_component from "../CommonComponents/DropDown";
import Header from "../CommonComponents/Header";

const PaymentForm = () => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [TextColorchange] = useAtom(SecondryColorSeclectorAtom)
    const [valuea, setValuea] = useState("");
    const [listData, setListData] = useState([]);
    const [sendimg, Setsendimg] = useState()
    const [txDetail, setTxDetail] = useState()
    const { state } = useLocation();

    let initialValue = {
        property_transfer_fee: "",
        cardType: "",
        cardNumber: "",
        expiration_date: "",
        cardHolderName: "",
        cardPin: "",
        Notary: ""
    };

    const [inputData, setInputData] = useState(initialValue);
    const Navigate = useNavigate()

    const regexNumber = /^[0-9\b]+$/;
    const patternName = /^[a-z][a-z\s]*$/;

    const validationSchema = () => {
        return Yup.object().shape({
            property_transfer_fee: Yup.string()
                .required("Property Transfer fee is required")
                .matches(regexNumber, "Pls Enter only Numeric Values"),

            expiration_date: Yup.string().required("Expiration Date is required"),

            cardNumber: Yup.string()
                .required("CardNumber is required")
                .matches(regexNumber, "Pls Enter only Numeric Values")
                .min(16, "Card no must be 16 characters")
                .max(16, "card no must not exceed 16 characters"),

            cardHolderName: Yup.string()
                .required("Card HolderName is required")
                .matches(patternName, "Name must be in alphabets letter"),

            cardPin: Yup.string()
                .required("CardPin is required")
                .matches(regexNumber, "Pls Enter only Numeric Values")
                .min(4, "Card Pin must be at least 4 characters")
                .max(7, "Password must not exceed 7 characters"),
        });
    };

    const SubmitSuccess = () => toast("Payment submitted successfully.");

    const updatePayment = (value) => {
        console.log(value)
        console.log("inputData", inputData)
        inputData.cardNumber = value.cardNumber;
        inputData.expiration_date = value.expiration_date;
        inputData.cardHolderName = value.cardHolderName;
        inputData.cardPin = value.cardPin;
        updateTransactionStatus({ "stage": "sale_details", "stageStatus": "payment_details_status", "propertyId": state?.id, "current_status": "notarize", "notary": inputData.Notary }).then((res) => {
            if (res.status == 200) {
                SubmitSuccess()
                Navigate('/transaction', {
                    state: {
                        id: state.id
                    }
                })
            }
        })
    };

    const GetSinglePropertyTransactionData = async () => {
        try {
            await getTransaction(state.id).then(res => {
                console.log("txdata", res)
                setTxDetail(res.data.result)
                inputData.property_transfer_fee = Number(res.data.result.bid_amount) + 100
                setInputData(inputData)
            })
        }
        catch (err) {
            window.alert(err)
        }
    }

    const NotaryListData = async () => {
        await notaryList().then((res) => {
            if (listData.length === 0) {
                res.data.response.map((data) => {
                    let obj = {
                        option: data.uname,
                    }
                    listData.push(obj)
                    setListData(listData)
                })
            }
        })
    }

    const handleInput = (e, i) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        Setsendimg(URL.createObjectURL(file))
    }

    useEffect(() => {
        NotaryListData()
        if (!txDetail) {
            GetSinglePropertyTransactionData();
        }
    }, [state])

    return (
        <>
            <Header />
            <div className="container-fluit px-3">
                <nav class="activetab ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a onClick={() => Navigate('/myproperties')}>Properties</a></li>
                        <li class="breadcrumb-item"><a onClick={() => Navigate(-1)}>Transactions</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Payment</li>
                    </ol>
                </nav>
                <Formik
                    initialValues={initialValue}
                    validationSchema={inputData.cardType == 'Cheque' ? null : validationSchema}
                    initialTouched={{ zip: true }}
                    onSubmit={updatePayment}
                >
                    {({ handleBlur, handleChange, }) => (
                        <Form >
                            <div className="row g-3">
                                <div className="col-sm-12">
                                    <h5 className="TopHaddings" style={{color:TextColorchange}} >Payment</h5>
                                </div>

                                <div className="col-sm-4">
                                    <label htmlFor="property_transfer_fee" className="my-card-text">
                                        Property Transfer Fee
                                    </label>
                                    <input type="text" className="form-control" id="property_transfer_fee" name="property_transfer_fee" value={inputData.property_transfer_fee} readonly />
                                </div>
                                <div className="col-sm-4">
                                    <label htmlFor="cardType" className="my-card-text">
                                        Card Type
                                    </label>
                                    <select
                                        class="form-select"
                                        aria-label="cardType"
                                        name="cardType"
                                        onBlur={handleBlur}
                                        onChange={handleInput}
                                    >
                                        <option value="debitCard">Debit Card</option>
                                        <option value="creditCard">Credit Card</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    {
                                        inputData.cardType == 'Cheque' ?
                                            <>
                                                {
                                                    sendimg ?
                                                        <div class="d-flex justify-content-center border">
                                                            <div class="text-center" >
                                                                <img src={sendimg} style={{ height: "100px" }} />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div class="d-flex justify-content-center border p-2 m-4">
                                                            <div class="text-center" >
                                                                <label for="file">
                                                                    Upload Cheque
                                                                </label>
                                                                <input
                                                                    class="inputfile"
                                                                    id="file"
                                                                    type="file"
                                                                    name="files"
                                                                    hidden
                                                                    multiple
                                                                    onChange={(event) => {
                                                                        captureFile(event);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                }
                                            </> :
                                            <>
                                                <label htmlFor="cardNumber" className="my-card-text">
                                                    Card Number
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder={""}
                                                    arialabel={"cardNumber"}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage
                                                    name="cardNumber"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </>
                                    }
                                </div>
                            </div>
                            <div className="row g-3 mt-2">
                                <div className="row g-3 mt-2">
                                    <div className="col-sm-4">
                                        <label htmlFor="expiration_date" className="my-card-text">
                                            Expiration Date
                                        </label>
                                        <Field
                                            type="date"
                                            id="expiration_date"
                                            name="expiration_date"
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder={""}
                                            onBlur={handleBlur}
                                        />

                                        <ErrorMessage
                                            name="expiration_date"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="cardHolderName" className="my-card-text">
                                            Cardholder's Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="cardHolderName"
                                            name="cardHolderName"
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder={""}
                                            onBlur={handleBlur}
                                        />

                                        <ErrorMessage
                                            name="cardHolderName"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="cardPin" className="my-card-text">
                                            Pin
                                        </label>
                                        <Field
                                            type="password"
                                            id="cardPin"
                                            name="cardPin"
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder={""}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage
                                            name="cardPin"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="row g-2 mt-2">

                                    <div class="col-sm-4">
                                        <label class="my-card-text">Notary list</label>
                                        <DropDown_component droplist={listData} onChange={handleChange} />
                                    </div>


                                    <div className="col-sm-8 d-flex justify-content-end align-items-end gap-2">
                                        <button
                                            style={{ background: Btnbgchange, border: 'none' }}
                                            className="btn "
                                            type="Submit"
                                        >Submit</button>


                                    </div>

                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default PaymentForm;