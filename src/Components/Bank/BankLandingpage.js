import React, { useState } from "react";
import TextFieldCom from "../CommonComponents/TextField";
import Button_Component from "../CommonComponents/Button";
import Header from "../CommonComponents/Header";
import { createRequest } from "../../Services/BankServices/BankServices";
import { toast } from "react-toastify";
import DropDown_component from "../CommonComponents/DropDown";

const BankLandingPage = () => {
  const initialValue = {
    property_id: "",
    owner_id: "",
    NotaryStatus: false,
    MortgageStatus: false
  };
  const [inputData, setinputData] = useState(initialValue);

  const handleInput = (e, i) => {
    const { name, value } = e.target;
    setinputData({ ...inputData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("inputData", inputData)
    createRequest({
      "ID": inputData.property_id,
      "OwnerId": inputData.owner_id,
      // "ID": "63d6e55a63e43ad1c41346d4",
      // "OwnerId": "63d0bb4d44f0cf6505d0a1da",
      "MortgageStatus": JSON.parse(inputData.MortgageStatus),
      "NotaryStatus": JSON.parse(inputData.NotaryStatus)
    }).then((res => {
      let resp = JSON.stringify(res)
      let parseddata = JSON.parse(resp)
      let parse2 = JSON.parse(parseddata.data.txid)
      console.log("banklandingpage", parse2.verificationResult)
      if (parse2.verificationResult == true) {
        toast.success("Verification successfully! Property data valid")
      }
      else if (parse2.verificationResult == false) {
        toast.warn("Property data Invalid!")
      }
      else if (parse2 == {} || parse2.verificationResult == undefined) {
        toast.warn("Try again!")
      }
    }))
  };

  const MortgageStatus = [
    { option: "true" },
    { option: "false" },
  ]

  const NotaryStatus = [
    { option: "true" },
    { option: "false" },
  ]

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center m-5">
        <div className="card p-5" style={{ width: "25rem" }}>
          <form>
            <TextFieldCom
              type={"text"}
              placeholder={"Property Id"}
              className="form-control mt-2"
              id="property_id"
              name={"property_id"}
              value={inputData.property_id}
              onChange={handleInput}
              style={{ border: "none", borderBottom: "1px solid grey" }}
            ></TextFieldCom>
            <TextFieldCom
              type={"text"}
              placeholder={"Owner Id"}
              className="form-control mt-2"
              id="owner_id"
              name={"owner_id"}
              value={inputData.owner_id}
              onChange={handleInput}
              style={{ border: "none", borderBottom: "1px solid grey" }}
            ></TextFieldCom>
            <div className="text-center d-flex justify-content-start">
              <div className="row w-50">
                <span htmlFor="MortgageStatus" className="my-card-text mt-3">
                  Mortgage Status
                </span>
                <span htmlFor="MortgageStatus" className="my-card-text mt-2">
                  Notary Status
                </span>
              </div>
              <div>
                <div style={{ width: "150px" }} className="mt-3">
                  <DropDown_component droplist={MortgageStatus} name={"MortgageStatus"} id={"MortgageStatus"} onChange={handleInput} />
                </div>
                <div style={{ width: "150px" }} className="mt-2">
                  <DropDown_component droplist={NotaryStatus} name={"NotaryStatus"} id={"NotaryStatus"} onChange={handleInput} />
                </div>
              </div>
            </div>
            <div class="mt-3">
              <Button_Component
                className={"btn  form-control"}
                text={"Submit"}
                onClick={onSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BankLandingPage;