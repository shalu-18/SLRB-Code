import { Formik, Field, Form, ErrorMessage, } from "formik";
import React, { useEffect, useState } from "react";
import DropDown_component from "../CommonComponents/DropDown";
import Upalodpropertyimg from "./Upalodpropertyimg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addproperty } from "../../Services/UsersServices/User_Services";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"
import { useNavigate } from "react-router-dom";

const AddProperty_Form = () => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [TextColor] = useAtom(SecondryColorSeclectorAtom)
    const [LocalDataVal, setLocalDataVal] = useState(JSON.parse(localStorage.getItem("Logindata")))
    const AddPropertyTost = () => toast("Property added successfully.");
    const [imageval, setImageVal] = useState(false)

    const [Addpropertyform, setAddpropertyform] = useState({
        property_name: "",
        property_type: "Apartment",
        property_amount: "",
        bedrooms: "",
        bathrooms: "",
        phone: "",
        street: "",
        city: "",
        country: "",
        pincode: "",
        description: "",
        account_holder_name: "",
        account_no: "",
        bank_name: "",
        ifsc_code: "",
        images: [],
    });

    const navigate = useNavigate()

    const initialValues = {
        property_name: "",
        property_type: "Apartment",
        property_amount: "",
        bedrooms: "",
        bathrooms: "",
        phone: "",
        street: "",
        city: "",
        country: "",
        pincode: "",
        description: "",
        account_holder_name: "",
        account_no: "",
        bank_name: "",
        ifsc_code: "",
        images: [],
    };
    const [inputData, setInputData] = useState(initialValues);
    const PropertyType = [
        { option: "Apartment" },
        { option: "Flat" },
        { option: "House" },
    ]
    const Listofcoutry = [
        { option: "india" },
        { option: "Bahrain" },
    ]

    const handleImg = (data) => {
        inputData.images = data
        setInputData(inputData)
        setImageVal(true)
    }
    useEffect(() => {
    
    }, [inputData])

    const Onlynumber = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
    const OnlyEnglishchar = /[^0-9]/
    const validationSchema = () => {
        return Yup.object().shape({

            property_name: Yup.string()
                .required("Propert name is required")
                .min(2, "Propert name  must be at least 2 characters")
                .max(25, "Propert name not exceed 25 characters")
                .matches(OnlyEnglishchar, "Property name must be a alphabet"),
            property_type: Yup.string()
                .required("PropertyType is required"),
            property_amount: Yup.string()
                .required("Property amount is required")
                .matches(Onlynumber, "Property type must be a number"),
            bedrooms: Yup.string()
                .required("No of bedrooms required")
                .matches(Onlynumber, "Bedrooms type must be a number"),
            bathrooms: Yup.string()
                .required("No of bathrooms required")
                .matches(Onlynumber, "Bathroom type must be a number"),
            phone: Yup.string()
                .required("Number is required"),
            street: Yup.string()
                .required("Street is required")
                .matches(OnlyEnglishchar, "Street name must be in alphabet"),
            city: Yup.string()
                .required("City name required")
                .matches(OnlyEnglishchar, "City name must be a alphabet "),
            country: Yup.string()
                .required("Country name required")
                .matches(OnlyEnglishchar, "Country name must be a alphabet"),
            pincode: Yup.string()
                .required("pincode is required")
                .matches(Onlynumber, "Pincode  must be a number")
                .min(6, "Pincode must be at least 6 characters"),
            description: Yup.string()
                .required("Description is required"),
            account_holder_name: Yup.string()
                .required("Name is required")
                .matches(OnlyEnglishchar, "Only alphabet ")
                .min(2, "Name must be at least 2 characters")
                .max(25, "Name must not exceed 25 characters"),
            account_no: Yup.string()
                .required("Aucount number is required")
                .matches(Onlynumber, "Account number must be a number")
                .min(8, "Account number must be at least 8 characters")
                .max(12, "Account number not exceed 12 characters"),
            bank_name: Yup.string()
                .required("Bank name is required")
                .matches(OnlyEnglishchar, "Must be a alphabet "),
            ifsc_code: Yup.string()
                .required("IFSC code is requtired")
                .min(11, "IFSC code must be 11 digits"),
        })
    }

    const handleClick = (value) => {
        const formData = new FormData()
        formData.append("property_name", value.property_name)
        formData.append("property_type", value.property_type)
        formData.append("property_amount", value.property_amount)
        formData.append("images", inputData.images, inputData.images.name)
        formData.append("bedrooms", value.bedrooms)
        formData.append("bathrooms", value.bathrooms)
        formData.append("phone", value.phone)
        formData.append("street", value.street)
        formData.append("city", value.city)
        formData.append("pincode", value.pincode)
        formData.append("country", value.country)
        formData.append("description", value.description)
        formData.append("account_holder_name", value.account_holder_name)
        formData.append("account_no", value.account_no)
        formData.append("bank_name", value.bank_name)
        formData.append("ifsc_code", value.ifsc_code)
        formData.append("user_id", LocalDataVal._id)
        console.log(value)
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        // }
        addproperty(formData).then(res => {
            console.log("Property Added", res)
            if (res.status === 201) {
                AddPropertyTost()
                navigate('/myproperties')
            }
            else {
                toast.error("Somthing went wrong.")
            }
        })
    }

    return (
        <>
            <div class="container">
                <Formik
                    initialTouched={{ zip: true }}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleClick}
                >
                    {({ handleChange }) => {
                        return (
                            <Form>
                                <div className="row g-3 pt-2 ">
                                    <div className="col-md-12 ">
                                        <h5 className="TopHaddings" style={{ color: TextColor }}>Property  Details</h5>
                                    </div>
                                    <div className="col-md-6 " >
                                        <div className="row g-3">
                                            <div className="col">
                                                <label htmlFor="property_type" className="my-card-text">
                                                    Property Type
                                                </label>
                                                <DropDown_component droplist={PropertyType} name={"property_type"} id={"property_type"} onChange={handleChange} />
                                                <ErrorMessage
                                                    name="property_type"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="property_amount" className="my-card-text">
                                                    Property Amount
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="property_amount"
                                                    name="property_amount"
                                                    className="form-control"
                                                    placeholder="Enter property_amount"
                                                    onChange={handleChange}
                                                />
                                                <ErrorMessage
                                                    name="property_amount"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mt-3">
                                            <div className="col">
                                                <Field
                                                    type="text"
                                                    id="bedrooms"
                                                    name="bedrooms"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Bedrooms"
                                                />
                                                <ErrorMessage
                                                    name="bedrooms"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col">
                                                <Field
                                                    type="text"
                                                    id="bathrooms"
                                                    name="bathrooms"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Bathrooms"
                                                />
                                                <ErrorMessage
                                                    name="bathrooms"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 ">
                                            <div className="col-sm-12 " style={{ marginTop: 33 }}>
                                                <label htmlFor="location_name" className="my-card-text">
                                                    Description
                                                </label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" name={"description"} onChange={handleChange}></textarea>
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row g-3">
                                            <div className="col">
                                                <label htmlFor="property_name" className="my-card-text">
                                                    Address / Location
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="property_name"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Property Name"
                                                />
                                                <ErrorMessage
                                                    name="property_name"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-sm-4 mt-4" >
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="phone"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Number"
                                                />
                                                <ErrorMessage
                                                    name="phone"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-sm-4 " style={{ marginTop: 24 }}>
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="street"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Street"
                                                />
                                                <ErrorMessage
                                                    name="street"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-sm-4" style={{ marginTop: 24 }}>
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="city"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="City"
                                                />
                                                <ErrorMessage
                                                    name="city"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-sm-4" style={{ marginTop: 50 }}>
                                                <DropDown_component droplist={Listofcoutry} name={"country"} id={"country"} onChange={handleChange} />
                                                <ErrorMessage
                                                    name="country"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-sm-4" style={{ marginTop: 24 }}>
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="pincode"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Zip/pincode"
                                                />
                                                <ErrorMessage
                                                    name="pincode"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mt-1">
                                            <div className="col-sm-4">
                                                <label htmlFor="bank_details" className="my-card-text">
                                                    Bank details
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={"account_holder_name"}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Account holder name"

                                                />
                                                <ErrorMessage
                                                    name="account_holder_name"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-sm-4" style={{ marginTop: 24 }}>
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="account_no"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Account Number"
                                                />
                                                <ErrorMessage
                                                    name="account_no"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-sm-4" style={{ marginTop: 24 }}>
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="bank_name"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Bank Name"
                                                />
                                                <ErrorMessage
                                                    name="bank_name"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-sm-4" style={{ marginTop: 11 }}>
                                                <label className="my-card-text">
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="ifsc_code"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="IFSC code"
                                                />
                                                <ErrorMessage
                                                    name="ifsc_code"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 d-md-flex flex-md-row justify-content-between pt-4">
                                    <div class="col col-md-6">
                                        <Upalodpropertyimg value={inputData.images} sendImg={handleImg} />
                                        <div class="col d-flex flex-row-reverse pt-2">
                                            <button className="btn " type="submit" style={{ background: Btnbgchange, border: 'none' }} >Submit</button>
                                        </div>
                                        <div>{
                                            imageval === false ? <h6 class="text-danger">Property image is required</h6> : ""
                                        }</div>
                                    </div>
                                </div>


                            </Form>)
                    }}
                </Formik>

            </div>
        </>
    )
}
export default AddProperty_Form;