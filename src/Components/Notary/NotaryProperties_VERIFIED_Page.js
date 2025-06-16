import React from 'react'
import { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png"
import { noteryVerified } from "../../Services/NotaryServices/Notary_services";
import { useNavigate } from 'react-router-dom';
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const NotaryProperties_VERIFIED_Page = () => {
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const [verifiedData, setVerifiedData] = useState([])
  const Navigate = useNavigate()

  const GetNotaryVerified = () => {
    noteryVerified().then((res) => {
      setVerifiedData(res.data.property);
      console.log("notary verified data", res.data);
    });
  };

  useEffect(() => {
    GetNotaryVerified();
  }, []);


  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    < div class="row">
      {
        verifiedData ? verifiedData.map((data) => {
          return (
            <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
              <form>
                <div style={{ position: "relative", width: "auto" }}>
                  <p class="my-card-title">{data.property_type} in {data.city}</p>
                  <h6 clss="my-card-text">{data.property_name}</h6>
                  <img src={`data:image/png;base64,${_arrayBufferToBase64(data.images[0].data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} />
                  <div>
                    <a class="btn " style={{ position: "absolute", right: 0, bottom: 0 ,background:Btnbgchange}} onClick={() => Navigate('/guestproperty', { state: { id: data._id } })}><img src={download_logo} /></a>
                  </div>
                </div>
                <div class="form-group">
                  <p className='my-card-text'>Notary Verification :<a class="text-success fw-bold"> {data.SLRB_Verfication}</a></p>
                </div>
              </form>
            </div>
          )
        }) : <h6 class="text-danger">No Pending Request!</h6>
      }
    </div >
  )
}

export default NotaryProperties_VERIFIED_Page
