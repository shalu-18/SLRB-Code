import React, { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png"
import { banktodoservice } from '../../Services/BankServices'
const TODO_Page = () => {
  const [banktodo, setBanktodo] = useState([])
  const getBankTodo = () => {
    banktodoservice().then((res) => {
      setBanktodo(res.data.property)
      console.log("datta", res.data.property)
    });
  };

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  useEffect(() => {
    getBankTodo();
  }, []);

  return (
    < div class="row gy-2 my-2" >
      {
        banktodo.length != 0 ? banktodo.map((data) => {
          console.log("dataaaaaa, ", data.property_details)
          return (
            <div class="col-md-6 col-md-4 col-lg-3 mb-2">
              <div style={{ position: "relative", width: "auto" }}>
                <p class="my-card-text">{data.property_details.property_type} in {data.property_details.city}</p>
                <img src={`data:image/png;base64,${_arrayBufferToBase64(data.property_details.images[0])}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} ></img>
                {/* <a href="#" class="btn " style={{ position: "absolute", right: 0, bottom: 0 }}><img src={download_logo} /></a> */}
              </div>
              <button className='btn  btn-sm mt-1 float-end' onClick={() => getBankTodo()}>{"Request For Verify"}</button>
            </div>
          )
        }) :  <h6 class="my-error-text">No Active Request!</h6>
      }
    </div >
  )
}

export default TODO_Page