import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginService } from "../../Services/UsersServices/User_Services";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Signup from "../Users/Signup_Formik";
import 'react-toastify/dist/ReactToastify.css';
import PasswordShowHide from '../CommonComponents/PasswordShowHide';
import ResetPassword from "../Users/ResetPassword";
import { Modal } from 'antd';
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"
import * as Yup from "yup";

const Signin = (props) => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [LocalDataVal, setLocalDataVal] = useState(JSON.parse(localStorage.getItem("Logindata")));
    const [ishandleClick, setHandleClick] = useState(JSON.parse(localStorage.getItem("Logindata")) ? true : false);
    let navigate = useNavigate();

    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
                .max(40, "Password must not exceed 40 characters"),
        });
    };

    const handleClick = (value) => {
        LoginService(value).then((res) => {
            if (res.status === 200) {
                props.handleCancel()
                setHandleClick(true)
                localStorage.setItem("Logindata", JSON.stringify(res.data.user))
                localStorage.removeItem("SelectedMenuItem")
                setLocalDataVal(JSON.parse(localStorage.getItem("Logindata")))
                if (res.data.user.role === "notary") {
                    navigate('/notary')
                }
                else if (res.data.user.role == "bank") {
                    navigate('/bank')
                }
                else if (res.data.user.role == "admin") {
                    navigate('/admin/alluser')
                }
                else {
                    navigate('/myproperties')
                }
            }
            else {
                toast.warn(res.statusText);
            }
        }
        ).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message, { position: "top-right", autoClose: 5000 })
        })

    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //SignUP modal
    const [signupModal, setSignupModal] = useState(false);
    const openModal = () => {
        setSignupModal(true);
    };

    const handldone = () => {
        setSignupModal(false);
    };

    const handleClose = () => {
        setSignupModal(false);
    };

    return (
        <>
            <div className="row " style={{ borderRadius: "20px" }}>
                <div className="col-md-12 ">
                    <div className="d-flex flex-row justify-content-center  ">
                        <div className="col-md-12">
                            <div>
                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    validationSchema={validationSchema}
                                    initialTouched={{ zip: true }}
                                    onSubmit={(values) => {
                                        handleClick(values)

                                    }}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        handleBlur,

                                    }) => (
                                        <Form>
                                            <div className=" col-md-12 justify-conetnt-center ">
                                                <div className=" col-md-12">
                                                    <label htmlFor="email" className="mt-3">
                                                        EMAIL
                                                    </label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        placeholder="Enter email id / username"
                                                        className="form-control inp_text"
                                                        id="email"

                                                    />

                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>


                                                <div className=" col-md-12 position-relative">
                                                    <label htmlFor="password" className="mt-4">
                                                        PASSWORD
                                                    </label>
                                                    <Field

                                                        name="password"
                                                        className="form-control"
                                                        placeholder='PASSWORD'
                                                        component={PasswordShowHide}
                                                        onChange={handleChange}
                                                        value={values.password}

                                                    />
                                                    <ErrorMessage
                                                        name="password"
                                                        component="div"
                                                        className="text-danger"
                                                    />

                                                </div>
                                                <div className=" col-md-12">
                                                    <div className="d-flex col-md-12 p-2 flex-row justify-content-between align-content-center p-2">
                                                        <div className="col d-md-flex justify-content-md-start labeltext">
                                                        </div>
                                                        <div
                                                            className="col-md-11 d-flex justify-content-end  p-1 forgettext"
                                                            onClick={showModal}
                                                        >
                                                            FORGOT PASSWORD
                                                        </div>

                                                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} title="Reset Password">
                                                            <ResetPassword />
                                                        </Modal>
                                                    </div>
                                                </div>
                                                <div class="d-grid gap-2 col-12 mx-auto">
                                                    <button class="btn " type="submit" style={{ background: Btnbgchange }}>Login</button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="d-flex flex-column align-content-center justify-content-center">
                                <div className="pt-3 col-md-12 d-flex flex-row justify-content-evenly align-content-center ">
                                    <div className="dont_have_account" onClick={openModal}>
                                        DONT YOU HAVE ACCOUNT &nbsp;
                                        <span className="signup_btn">
                                            <a
                                                style={{ color: "#FF0F18", fontWeight: 500 }}
                                            >SIGNUP</a>
                                        </span>
                                    </div>
                                    <Modal open={signupModal} onOk={handldone} onCancel={handleClose} footer={null} >
                                        <Signup onCancel={handleClose} />
                                    </Modal>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signin