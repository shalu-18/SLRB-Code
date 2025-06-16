import React, { useState } from "react";
import Button_Component from "../CommonComponents/Button";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import { resetPassword } from "../../Services/UsersServices/User_Services";
import * as Yup from "yup";
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const ResetPassword = () => {
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    });
  };


  const sendLink = async(value) => {
   await resetPassword(value.email).then(res => {
      console.log("resetdata", res)
      if (res.status === 200) {
        toast.success("Email send to your email id check and verify for reset password.")
      }
      else {
        toast.error("Somthing went wrong, try again")
      }

    })
  }


return (
  <>
   <div class="container">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          initialTouched={{ zip: true }}
          onSubmit={(values) => {
            sendLink(values)

          }}
        >
          {({
            values,
            handleChange,
            handleBlur,

          }) => (
            <Form>
              <div className=" col-md-12 mb-1">          
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
              <div className=" col-md-12 mt-3">
                <Button_Component
                  type={"submit"}
                  value={sendLink}
                  onClick={() => { sendLink() }}
                  className={"btn  "}
                  text={'Send'}
                  style={{ width: "25rem", background:Btnbgchange, border:'none' }}
                />
              </div>

            </Form>
          )}
        </Formik>
      </div>
   
  </>
)
          }

export default ResetPassword;
