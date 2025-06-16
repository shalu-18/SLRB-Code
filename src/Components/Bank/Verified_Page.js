import React from 'react'
import { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png";
import {bankVerified} from "../../Services/BankServices"
const VERIFIED_Page = () => {
  const [verifieddata, setVerifiedData] = useState()
  const Verifiedproperty = () => {
    bankVerified().then((res) => {
      console.log("verified property", res)
      setVerifiedData(res.data)
    })
  }

  useEffect(() => {
    Verifiedproperty()
  }, [])


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
        verifieddata ? verifieddata.map((data) => {
          return (
            <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
              <form>


                <div style={{ position: "relative", width: "auto" }}>
                  <p class="my-card-text">{"Bahrain Bay Studio"}</p>
                  <img src={`data:image/png;base64,${_arrayBufferToBase64(data.images[0].data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} />
                  <div>
                    <a class="btn " style={{ position: "absolute", right: 0, bottom: 0 }} ><img src={download_logo} /></a>

                  </div>
                </div>


                <div class="form-group">
                  <p className='card-text'>SLRB Verification : {"Success"}</p>
                </div>

                <div class="form-group">
                  <label for="srlb_remark" class="form-label">SLRB Remark</label>
                  <textarea class="form-control" id="srlb_remark" rows="3"></textarea>
                </div>

                <div class="form-group mb-5">
                  <label for="srlb_notary_comment" class="form-label">Notary Comment</label>
                  <textarea class="form-control" id="srlb_remark" rows="3"></textarea>
                </div>
              </form>
            </div>
          )
        }) :
          <h6 class="text-danger">No verified Request!</h6>
      }
    </div >

  )
}

export default VERIFIED_Page
