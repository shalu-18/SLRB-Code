import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { NewPassword } from "../../Services/UsersServices/User_Services";
import { Formik, Field, ErrorMessage, Form } from "formik";
import PasswordShowHide from '../CommonComponents/PasswordShowHide';
import * as Yup from "yup"
import { toast } from "react-toastify";
import Footer from "../CommonComponents/Footer"
import Header from "../CommonComponents/Header";


const UpdatePassword = () => { 
 const { token } = useParams()
 const Navigate = useNavigate()


  const resetpass = async (value) => {
    await NewPassword(value, token).then((res) => {
      console.log("Updatepassword", res)
      if (res.status == 200) {
        toast.success("Password Reset Successfully.")
        Navigate('/')
      } else {
        toast.error("Invalid User");
      }
    }).catch((error) => {
    
        toast.error(error.response.data.message, { position: "top-center", autoClose: 5000 })
  })

  }

  const validationSchema = () => {
    return Yup.object().shape({

      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(16, "Password must not exceed 16 characters"),

      cpassword: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(16, "Password must not exceed 16 characters"),

    });
  };

  return (<>

<Header/>   
            <div class="pt-5">
          
              <Formik
                initialValues={{ password: "", cpassword: "" }}
                validationSchema={validationSchema}
                initialTouched={{ zip: true }}
                onSubmit={(values) => resetpass(values)}
              >

                {({
                  values,
                  handleChange,


                }) => (

                  <Form class="col-lg-6 offset-lg-3 pt-5">
                    
                      <div className="col ">
                        <label htmlFor="password" className="mt-4">
                          PASSWORD
                        </label>
                        <Field

                          name="password"
                          className="form-control"
                          placeholder='PASSWORD'
                          component={PasswordShowHide}
                          onChange={handleChange}
                          id="password"
                          value={values.password}


                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />

                      </div>
                      <div className=" col">
                        <label htmlFor="password" className="mt-4">
                          NEWPASSWORD
                        </label>
                        <Field

                          name="cpassword"
                          className="form-control"
                          placeholder='NEWPASSWORD'
                          component={PasswordShowHide}
                          onChange={handleChange}
                          value={values.cpassword}
                          id="cpassword"
                        />
                        <ErrorMessage
                          name="cpassword"
                          component="div"
                          className="text-danger"
                        />

                      </div>

                      <div className="col offset-3 mt-4">

                        <button
                          type={"submit"}
                          value={"submit"}
                          className={"btn  "}
                          text={"Reset Password"}
                          style={{ width: "20rem" }}
                        >Reset</button>                  
                        </div>
                        
                  </Form>


                )
                }
              </Formik>
            </div>
            
     <Footer/>
     
  



  </>


  );
}



export default UpdatePassword

