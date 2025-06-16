import React, { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png";
import { bankPending } from "../../Services/BankServices";
import { useNavigate } from 'react-router-dom';
import Button_Component from '../CommonComponents/Button';
const PENDING_Page = () => {

  const [bankpendingval, setBankpendingval] = useState()
  const Navigate = useNavigate()
  const PandingData = () => {
    bankPending().then(res => {
      console.log("Bank pending data", res.data.property)
      setBankpendingval(res.data.property)
    })
  }
  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const ShowSinglepropertydetails = (data) => {
    Navigate('/guestproperty', {
      state: {
        id: data._id
      }
    })
  }

  useEffect(() => {
    PandingData();
  }, []);



  return (
    < div class="row">
      {
        bankpendingval ? bankpendingval.map((data) => {
          console.log("bankdata", data)
          return (
            <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
              <form>
                <div style={{ position: "relative", width: "auto" }}>
                  <p class="my-card-text">{data.property_type} in {data.city}</p>
                  <img src={`data:image/png;base64,${_arrayBufferToBase64(data.property_details.images[0])}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} />
                  <div>
                    {/* <a class="btn " style={{ position: "absolute", right: 0, bottom: 0 }} onClick={() => ShowSinglepropertydetails(data)} ><img src={download_logo} /></a> */}
                  </div>
                </div>
                <div class="form-group">
                  <p className='card-text'>SLRB Verification : {data.property_details.notary_status == "verified" ? <a class="text-success">true</a> : <a class="text-danger">false</a>}</p>
                </div>
              </form>
            </div>
          )
        }) : <h6 class="text-danger">No eanding Request!</h6>
      }
    </div >

  )
}

export default PENDING_Page
