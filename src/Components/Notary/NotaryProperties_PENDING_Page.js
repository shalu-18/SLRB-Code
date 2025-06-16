import React, { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png"
import { noteryPending } from "../../Services/NotaryServices/Notary_services";
import { useNavigate } from 'react-router-dom';
import Footer from '../CommonComponents/Footer';
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const NotaryProperties_PENDING_Page = () => {
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const Navigate = useNavigate()
  const [fileName, setFileName] = useState()
  const [Fileindex, setFileIndex] = useState()
  const [fileBuffer, setFileBuffer] = useState()
  const [uploadfile, setUploadfile] = useState()
  const [noteryPendingdata, setNoteryPendingdata] = useState([])

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
    })
  }

  const GetNotaryPending = () => {
    noteryPending().then((res) => {
      setNoteryPendingdata(res.data.property)
      console.log("notary pending data", res.data);
    });
  };

  useEffect(() => {
    GetNotaryPending();
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



  const captureFile = (event, index) => {
    event.preventDefault();
    setFileIndex(index)
    let file = event.target.files[0];
    console.log("file", file);
    setFileName(file.name)
    setFileBuffer(file)
    setUploadfile(file)
  }

  return (
    <>
      < div class="row">
        {
          noteryPendingdata ? noteryPendingdata.map((data) => {
          
            return (
              <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                <form>
                  <div style={{ position: "relative", width: "auto" }}>
                    <p class="my-card-title ">{data?.property_type} in {data?.city}</p>
                    <h6 clss="my-card-text">{data.property_name}</h6>
                    <img src={`data:image/png;base64,${_arrayBufferToBase64(data?.images[0].data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} />
                    <div>
                      <a class="btn " style={{ position: "absolute", right: 0, bottom: 0,background:Btnbgchange }} ><img src={download_logo} onClick={() => {
                          Navigate('/transaction', {
                            state: {
                              id: data._id
                            }
                          })
                      }} /></a>
                    </div>
                  </div>
                 
                </form>
              </div>
            )
          }) : <h6 class="text-dander fw-bold">No Pending Request!</h6>
        }
      </div >
      <Footer />
    </>
  )
}

export default NotaryProperties_PENDING_Page
