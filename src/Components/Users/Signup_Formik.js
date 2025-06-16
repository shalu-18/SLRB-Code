import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Field, ErrorMessage, Form } from "formik";
import PasswordShowHide from '../CommonComponents/PasswordShowHide';
import CheckBox from "../CommonComponents/CheckBox";
import { AddUser } from "../../Services/UsersServices/User_Services";
import DropdownSearchForCountryCode from "../CommonComponents/CountrycodeDropdown";
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"
import * as Yup from "yup";

const SignUp = (props) => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [valuea, setValuea] = useState("");
    const [Checkboxvalue, setCheckboxvalue] = useState(false);
    const [countryCode, setcountryCode] = useState("");
    const [countryCodeSelected, setcountryCodeSelected] = useState(true);
    const [countryName, setcountryName] = useState("");

    // const [resetForm, setresetForm] = useState(false)

    const Navigate = useNavigate()
    const [signup, setSignup] = useState({
        uname: "",
        phone: "",
        email: "",
        otp: "",
        password: "",


    });

    const initialValues = {
        uname: "",
        email: "",
        password: "",
        otp: "",
        phone: "",
        checkbox: "",

    };


    const handleClick = (value) => {
        // console.log("valuuuuuu", value.phone)
        signup.uname = value.uname;
        signup.phone = countryCode.concat(value.phone);
        console.log(signup.phone)
        signup.email = value.email;
        signup.password = value.password;
        signup.otp = value.otp;
        setValuea(signup)
        AddUser(value).then((res) => {
            console.log("Signupdata", res)
            if (res.status === 201) {
                toast.success("Account created successfully.")
                props.onCancel()
                Navigate('/')
                setSignup()


            }
            else {
                toast.error("Somthing went wrong, Check all filds and try again");
            }


        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message, { position: "top-right", autoClose: 5000 })
        })
    }

    const handleCountryCode = (value) => {
        setcountryCode(value);
        setcountryCodeSelected(true);
    };

    const handleCountryName = (value) => {
        setcountryName(value);
    };



    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const OnlyEnglishchar = (/[^A-Za-z]/ig, '');

    const validationSchema = () => {
        return Yup.object().shape({
            uname: Yup.string()
                .required("Name is required")
                .matches(OnlyEnglishchar, "Name must be in alphabets latter")
                .min(2, "Name must be at least 2 characters")
                .max(25, "Name must not exceed 25 characters"),
            email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
                .max(16, "Password must not exceed 16 characters"),
            phone: Yup.string()
                .matches(phoneRegExp, " Phone phone is not valid")
                .required("Phone Number is required"),
            otp: Yup.string()
                .required("OTP is required")
                .max(8, "OTP must not exceed 8 characters"),
        });
    };





    return (
        <div className="Signin">
            <div className="row " style={{ borderRadius: "20px" }}>
                <div className="col-md-12">
                    <div className="d-flex flex-row justify-content-center pb-2 pt-3">
                        <div className="col-md-12 ">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                initialTouched={{ zip: true }}
                                onSubmit={handleClick}
                            >
                                {({ handleChange }) => {
                                    return (
                                        <Form id="signupform">
                                            <div className=" col-md-12" style={{ fontSize: "14px" }}>
                                                <label className="labeltext">NAME</label>
                                                <div className="pt-2 inputbox">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="uname"
                                                        placeholder="NAME"
                                                        style={{
                                                            borderRadius: "5px",
                                                        }}
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="uname"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div
                                                className="pt-2 col-md-12"
                                                style={{ fontSize: "14px" }}
                                            >
                                                <label className="labeltext">EMAIL</label>
                                                <div className="pt-2 inputbox">
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter email id"
                                                        className="form-control inp_text"
                                                    />
                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="pt-2 col-md-12 "
                                                style={{ fontSize: "14px" }}
                                            >
                                                <label className="labeltext">PASSWORD</label>
                                                <div className="pt-2 inputbox position-relative">
                                                    <Field

                                                        name="password"
                                                        className="form-control"
                                                        placeholder='PASSWORD'
                                                        component={PasswordShowHide}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage
                                                        name="password"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>
                                            </div>
                                            <Form>
                                                <div
                                                    className="pt-2 col-lg-12 "
                                                    style={{ fontSize: "15px" }}
                                                >
                                                    <label className="labeltext">
                                                        MOBILE_NUMBER
                                                    </label>
                                                    <div className="pt-2" >
                                                        <div className=" col-12 d-flex flex-row gap-1 ">
                                                            <div style={{ width: "13rem" }}>
                                                                <DropdownSearchForCountryCode
                                                                    setCountry={handleCountryCode}
                                                                    setcountryName={handleCountryName}
                                                                />
                                                            </div>
                                                            <Field
                                                                name="phone"
                                                                type="tel"
                                                                className="form-control col-8"
                                                                style={{
                                                                    borderRadius: "5px",
                                                                }}
                                                                placeholder="989765432567"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div class="d-flex ">
                                                            &nbsp;&nbsp;
                                                            <ErrorMessage
                                                                name="phone"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                            <div
                                                className=" col-md-12 "
                                                style={{ fontSize: "14px" }}
                                            >
                                                <label className="labeltext">
                                                    OTP
                                                </label>
                                                <Field
                                                    name="otp"
                                                    className="form-control"
                                                    placeholder="OTP"
                                                />
                                                <ErrorMessage
                                                    name="otp"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div>
                                                <div className="py-2 ">
                                                    <CheckBox
                                                        text="I accept the Terms and Conditions, Privacy Policy & Rules"
                                                        name="checkbox"
                                                        value={Checkboxvalue}
                                                        style={{ fontSize: "0.8rem", fontWeight: "400" }}
                                                        onChange={(e) => {
                                                            setCheckboxvalue(e.target.checked);
                                                        }}
                                                        checked={Checkboxvalue}
                                                    />
                                                </div>
                                            </div>
                                            <div className="pt-2 col-md-12 text-center">
                                                <button
                                                    class="btn  "
                                                    type="submit"
                                                    style={
                                                        Checkboxvalue
                                                            ? {
                                                                background:Btnbgchange,
                                                                borderRadius: "8px",
                                                                width: "100%",
                                                                fontSize: "16px",
                                                                height: "44px",
                                                                border: "none",
                                                            }
                                                            : {
                                                                backgroundColor: "gray",
                                                                borderRadius: "8px",
                                                                color: "white",
                                                                width: "100%",
                                                                fontSize: "16px",
                                                                height: "44px",
                                                                border: "none",
                                                                cursor: "notAllowed",
                                                            }
                                                    }
                                                    disabled={!Checkboxvalue}
                                                >
                                                    SIGNUP
                                                </button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <ToastContainer />
        </div>
    );
};

export default SignUp;
