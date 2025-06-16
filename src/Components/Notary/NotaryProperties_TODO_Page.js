import React, { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png"
import { noteryTodo, RequestforVerify } from "../../Services/NotaryServices/Notary_services";
import { useNavigate } from 'react-router-dom';
import Button_Component from "../CommonComponents/Button";
import { toast } from 'react-toastify';
import Footer from '../CommonComponents/Footer';
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const NotaryProperties_TODO_Page = () => {
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const [notaryTodo, setNotaryTodo] = useState([])
  const Navigate = useNavigate();
  
  const GetNotaryTodo = () => {
    noteryTodo().then((res) => {
      setNotaryTodo(res.data.property)
       console.log("notery todo data", res.data.property);
    });
  };

  useEffect(() => {
      GetNotaryTodo();
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

  const checkProperty = (data) => {
    console.log("data", data._id);
    Navigate('/guestproperty', {
      state: {
        id: data._id
      }
    })
  }
  const RequsetVerif = (data) => {
    console.log("data", data);
    RequestforVerify(data._id).then((res) => {
      console.log("Yor Request place", res)
      toast.success("Request Placed Successful.")
      GetNotaryTodo()
    })
  }


  return (
    <>
    < div class="row gy-2 my-2" >
      {
        notaryTodo.map((data) => {
          return (
            <div class="col-md-6 col-md-4 col-lg-3 mb-2">


              <div style={{ position: "relative", width: "auto" }}>
                <p class="my-card-title">{data.property_type} in {data.city}</p>
                <h6 clss="my-card-text">{data.property_name}</h6>
                <img src={`data:image/png;base64,${_arrayBufferToBase64(data.images[0].data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} />
                <a class="btn " style={{ position: "absolute", right: 0, bottom: 0, background:Btnbgchange }}><img src={download_logo} onClick={() => checkProperty(data)}
                /></a>

              </div>
              <Button_Component
                className={"btn  btn-sm mt-1 float-end"}
                text={"Request For Verify"}
                onClick={() => RequsetVerif(data)}
              />

            </div>
          )
        })
      }
    </div >
     <Footer />
     </>
  )
}

export default NotaryProperties_TODO_Page