import React, { useEffect, useState } from "react";
import TextFieldCom from "../CommonComponents/TextField";
import Upalodpropertyimg from "./Upalodpropertyimg";
import questionmark from "../Assets/Images/questionmark.png";
import Button_Component from "../CommonComponents/Button";
import { addproperty } from "../../Services/Property_Detail";
import DropDown_component from "../CommonComponents/DropDown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const [LocalDataVal, setLocalDataVal] = useState(JSON.parse(localStorage.getItem("Logindata")))

  const initialValue = {
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


  const Listofcoutry = [
    { option: "india" },
    { option: "Bahrain" },
  ]
  
  const PropertyType = [
    { option: "Apartment" },
    { option: "Flat" },
    { option: "House" },
  ]
  const navigate = useNavigate();

  const [inputData, setInputData] = useState(initialValue);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInput = (e, i) => {
    console.log("nami", e.target)
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(inputData);
    }
  }, [formErrors, localStorage.getItem("Logindata")]);

  const handleImg = (data) => {
    inputData.images = data
    setInputData(inputData)
    // console.log("data", data)
  }
  const AddPropertyTost = () => toast("Property added successfully.");



  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("property_name", inputData.property_name)
    formData.append("property_type", inputData.property_type)
    formData.append("property_amount", inputData.property_amount)
    formData.append("images", inputData.images, inputData.images.name)
    formData.append("bedrooms", inputData.bedrooms)
    formData.append("bathrooms", inputData.bathrooms)
    formData.append("phone", inputData.phone)
    formData.append("street", inputData.street)
    formData.append("city", inputData.city)
    formData.append("pincode", inputData.pincode)
    formData.append("country", inputData.country)
    formData.append("description", inputData.description)
    formData.append("account_holder_name", inputData.account_holder_name)
    formData.append("account_no", inputData.account_no)
    formData.append("bank_name", inputData.bank_name)
    formData.append("ifsc_code", inputData.ifsc_code)
    formData.append("user_id", LocalDataVal._id)
    addproperty(formData).then(res => {
      console.log("Property Added", res)
      if (res.status === 201) {
        AddPropertyTost()
        navigate('/myproperties')
      }
      else {
        toast.error("Somthing went wrong.")
      }


    }).catch((error) => {
      console.log(error)
      toast.error(error.response.data.message, { position: "top-right", autoClose: 5000 })
  })

 

    
  };
  const validate = (values) => {
    const errors = {};
    const regexNumber = /^[0-9\b]+$/;

    const regexString = /^[A-Za-z]+$/;

    if (!values.property_amount) {
      errors.property_transfer_fee = " property_amount is required!";
    }
    else if (!regexNumber.test(values.property_amount)) {
      errors.property_amount = "Only Number is Allowed...";
    }


    if (!values.property_type) {
      errors.property_type = "Property Type is required!";
    }
    if (!values.country) {
      errors.country = "country is required!";
    }


    if (!values.account_no) {
      errors.account_no = "Account Number is required";
    }
    else if (!regexNumber.test(values.account_no)) {
      errors.account_no = "Only Number is Allowed...";
    }


    if (!values.phone) {
      errors.phone = " Number is required";
    }
    else if (!regexNumber.test(values.phone)) {
      errors.phone = "Only Number is Allowed...";
    }


    if (!values.expiration_date) {
      errors.expiration_date = "Expiration Date is required!";
    }
    if (!values.account_holder_name) {
      errors.account_holder_name = "AC holder name is required!";
    } else if (!regexString.test(values.account_holder_name)) {
      errors.account_holder_name = "Allow only alphabets";
    }


    if (!values.city) {
      errors.city = "city is required!";
    } else if (!regexString.test(values.city)) {
      errors.city = "Allow only alphabets";
    }


    if (!values.ifsc_code) {
      errors.ifsc_code = "IFSC code is required!";
    } else if (!regexString.test(values.ifsc_code)) {
      errors.ifsc_code = "Allow only alphabets & Number";
    }


    if (!values.street) {
      errors.street = "Street is required!";
    } else if (!regexString.test(values.street)) {
      errors.street = "Allow only alphabets & Number";
    }


    if (!values.location_name) {
      errors.location_name = "location_name is required!";
    } else if (!regexString.test(values.name)) {
      errors.location_name = "Allow only alphabets & Number";
    }


    if (!values.bedrooms) {
      errors.bedrooms = "bedrooms is required!";
    } else if (!regexString.test(values.bedrooms)) {
      errors.bedrooms = "Allow only alphabets & Number";
    }


    if (!values.bathrooms) {
      errors.bathrooms = "bathrooms is required!";
    } else if (!regexString.test(values.bathrooms)) {
      errors.bathrooms = "Allow only alphabets & Number";
    }


    if (!values.pincode) {
      errors.pincode = "pincode is required";
    } else if (!regexNumber.test(values.pincode)) {
      errors.pincode = "Only Number is Allowed...";
    }

    return errors;
  };
  return (
    <>
      <div className="row g-3 pt-2 ">
        <div className="col-md-12 ">
          <h5 className="TopHaddings">Property  Details</h5>
        </div>

        <div className="col-md-6 " >
          <div className="row g-3">
            <div className="col">
              <label htmlFor="property_type" className="my-card-text">
                Property Type
              </label>
              <DropDown_component droplist={PropertyType} name={"property_type"} id={"property_type"} onChange={handleInput} />

              <p className="text-danger">{formErrors.cardType}</p>
            </div>


            <div className="col">
              <label htmlFor="property_amount" className="my-card-text">

                Property Amount
              </label>
              <TextFieldCom
                type={"text"}
                id={"property_amount"}
                name={"property_amount"}
                value={inputData.property_amount}
                onChange={handleInput}
                className="form-control"
                placeholder={"Enter property_amount"}
                arialabel={"property_amount"}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col">
              <label htmlFor="bedrooms" className="my-card-text">
                Bedrooms
              </label>
              <TextFieldCom
                type={"text"}
                id={"bedrooms"}
                name={"bedrooms"}
                value={inputData.bedrooms}
                onChange={handleInput}
                className="form-control"
                placeholder={""}
                arialabel={"bedrooms"}
              />
            </div>
            <div className="col">
              <label htmlFor="property_transfer_fee" className="my-card-text">
                Bathrooms
              </label>
              <TextFieldCom
                type={"text"}
                id={"bathrooms"}
                name={"bathrooms"}
                value={inputData.bathrooms}
                onChange={handleInput}
                className="form-control"
                placeholder={""}
                arialabel={"bathrooms"}
              />
            </div>
          </div>
          <div className="row g-3 ">
            <div className="col-sm-12 " style={{ marginTop: 33 }}>
              <label htmlFor="location_name" className="my-card-text">
                Description
              </label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" name={"description"} onChange={handleInput}></textarea>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-3">
            <div className="col">
              <label htmlFor="property_name" className="my-card-text">

                Address / Location

              </label>
              <TextFieldCom
                type={"text"}
                id={"property_name"}
                name={"property_name"}
                value={inputData.property_name}
                onChange={handleInput}
                className="form-control"
                placeholder={" Name"}
                arialabel={"property_name"}
              />
            </div>
            <div className="col-sm-4" style={{ marginTop: 24 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"phone"}
                name={"phone"}
                value={inputData.phone}
                onChange={handleInput}
                className="form-control"
                placeholder={"No"}
                arialabel={"phone"}
              />
              <p className="text-danger">{formErrors.phone}</p>
            </div>
            <div className="col-sm-4 " style={{ marginTop: 24 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"street"}
                name={"street"}
                value={inputData.street}
                onChange={handleInput}
                className="form-control"
                placeholder={"Street"}
                arialabel={"street"}
              />
              <p className="text-danger">{formErrors.street}</p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-sm-4" style={{ marginTop: 24 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"city"}
                name={"city"}
                value={inputData.city}
                onChange={handleInput}
                className="form-control"
                placeholder={"City"}
                arialabel={"city"}
              />
              <p className="text-danger">{formErrors.city}</p>
            </div>
            <div className="col-sm-4" style={{ marginTop: 50 }}>
              <DropDown_component droplist={Listofcoutry} name={"country"} id={"country"} onChange={handleInput} />

              <p className="text-danger">{formErrors.country}</p>
            </div>

            <div className="col-sm-4" style={{ marginTop: 24 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"pincode"}
                name={"pincode"}
                value={inputData.pincode}
                onChange={handleInput}
                className="form-control"
                placeholder={"Zip/pincode"}
                arialabel={"pincode"}
              />
              <p className="text-danger">
                {formErrors.pincode}
              </p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-sm-4">
              <label htmlFor="bank_details" className="my-card-text">
                Bank details
              </label>
              <TextFieldCom
                type={"text"}
                id={"account_holder_name"}
                name={"account_holder_name"}
                value={inputData.account_holder_name}
                onChange={handleInput}
                className="form-control"
                placeholder={"Account holder name"}
                arialabel={"account_holder_name"}
              />
              <p className="text-danger">
                {formErrors.bank_details}
              </p>
            </div>
            <div className="col-sm-4" style={{ marginTop: 24 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"account_no"}
                name={"account_no"}
                value={inputData.account_no}
                onChange={handleInput}
                className="form-control"
                placeholder={"Account Number"}
                arialabel={"account_no"}
              />
              <p className="text-danger">
                {formErrors.account_no}
              </p>
            </div>
            <div className="col-sm-4" style={{ marginTop: 24 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"bank_name"}
                name={"bank_name"}
                value={inputData.bank_name}
                onChange={handleInput}
                className="form-control"
                placeholder={"Bank Name"}
                arialabel={"bank_name"}
              />
              <p className="text-danger">
                {formErrors.bank_name}
              </p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-sm-4" style={{ marginTop: 11 }}>
              <label className="my-card-text">

              </label>
              <TextFieldCom
                type={"text"}
                id={"ifsc_code"}
                name={"ifsc_code"}
                value={inputData.ifsc_code}
                onChange={handleInput}
                className="form-control"
                placeholder={"IFSC code"}
                arialabel={"ifsc_code"}
              />
              <p className="text-danger">
                {formErrors.ifsc_code}
              </p>
            </div>
          </div>
        </div>
      </div>



      <div class="col-sm-12 d-md-flex flex-md-row justify-content-between pt-4">
        <div class="col col-md-6">
          <Upalodpropertyimg value={inputData.images} sendImg={handleImg} />
          <div class="col d-flex flex-row-reverse pt-2">
            <Button_Component className={"btn "} text={"Submit"} onClick={onSubmit} />
          </div>
        </div>

      </div>






    </>

  );
};

export default PropertyDetails;