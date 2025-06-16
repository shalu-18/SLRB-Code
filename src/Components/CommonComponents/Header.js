import React, { useState, useEffect } from "react";
import Slrplogo from "../Assets/Images/rpqblogo.png";
import bhlogo from "../Assets/Images/bahrainlogo.png";
import { Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { LogoutService } from "../../Services/UsersServices/User_Services";
import LogOutbtn from "../Users/Logoutbtn";
import 'react-toastify/dist/ReactToastify.css';
import userprofileimg from "../Assets/Images/icon.png"
import Signin from "../Users/Login_Formik";
import { useAtom } from 'jotai';
import { GetBrandlogfromdb ,GetCountrylogofromdb} from "../../Services/AdminServices/Admin_Services";
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "./LandingPage"


const Header = () => {
  const [LocalDataVal, setLocalDataVal] = useState(JSON.parse(localStorage.getItem("Logindata")));
  const [isSubmit, setIsSubmit] = useState(JSON.parse(localStorage.getItem("Logindata")) ? true : false);
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const [CountryLogo,setCountrylogo] = useState()
  const [BrandLogo, setBrandLogo] = useState()
  let navigate = useNavigate();


  //Login modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const GetBrandlogo = () => {
    GetBrandlogfromdb().then((res) => {
      console.log("Geting brand logo from db", res)
      setBrandLogo(res.data.result[0].images[0].imgData.data)
  
    })
  }

  const GetCountrylogo = () =>{
    GetCountrylogofromdb().then((res)=>{
      console.log("geting Country logo from  db", res.data.result[0].images[0].imgData.data)
      setCountrylogo(res.data.result[0].images[0].imgData.data)
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

  useEffect(() => {
    GetBrandlogo()
    GetCountrylogo()
  }, [])

  //LogOut 
  const ClearData = () => {
    LogoutService().then(res => {
      console.log("LogOut msg", res)
      localStorage.removeItem("Logindata")
      localStorage.removeItem("SelectedMenuItem")
      if (window.location.pathname == "/") {
        window.location.reload(false);
      } else {
        navigate('/')
      }
    })
  }

  useEffect(() => {

  }, [localStorage.getItem("Logindata")])

  return (
    <>
      <nav class="navbar  sticky-top bg-light">
        <div class="container-fluid ">
          <div class="col ">
            {BrandLogo ? <img src={`data:image/png;base64,${_arrayBufferToBase64(BrandLogo)}`} className='img-fluid' onClick={() => navigate('/')} /> : <img src={Slrplogo} alt="RQLOGO" className='img-fluid' onClick={() => navigate('/')} />}

          </div>
          <div class="col ">
            <div class='d-flex justify-content-center'>
              {CountryLogo? <img src={`data:image/png;base64,${_arrayBufferToBase64(CountryLogo)}`} className='img-fluid' onClick={() => navigate('/')}  style={{borderRadius:"50%" , width:'60px', height:'60px'}}/>: <img src={bhlogo} alt="BHLOGO" className='img-fluid' />}
              
            </div>
          </div>
          <div class="col">
            <form class="d-flex  justify-content-end align-items-center gap-4">
              {/* <LangDrop /> */}
              {isSubmit == true ? <span><img class="px-2" src={userprofileimg} alt="" /><LogOutbtn username={LocalDataVal.uname} onClick={ClearData} /></span> :
                <Button style={{ backgroundColor: Btnbgchange, color: 'white', border: 'none', width: '4.5rem', height: '2.5rem', borderRadius: '8%' }} onClick={showModal}>Login</Button>
              }
            </form>
          </div>
        </div>
      </nav>

      <Modal className="TopHaddings" title="Welcome to Property Finder" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Signin handleCancel={handleCancel} />
      </Modal>







    </>
  )
}

export default Header