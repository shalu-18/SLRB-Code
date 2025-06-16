import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../Assets/Styles/ChangeUserRole.css"
import env from "../../Environment/Enviroment";
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const ChangeUserRole = () => {

  const [userDetails, setUserDetails] = useState()
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const { id } = useParams()
  const Navigate = useNavigate()
  const [callSubmitAgain, setCallSubmitAgain] = useState(true)

  const [inputData, setInputData] = useState({
    changerole: "user",
    user_active: true
  })

  useEffect(() => {
    const changeSingleUserRole = async () => {
      const url = `${env.Backend_Url}/admin/view/user/${id}`;
      axios.get(url, {
        withCredentials: true
      }).then((response) => {
        if (response.data) {
          setUserDetails(response.data.user)
        }

      }).catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000
        })
      })

    }
    changeSingleUserRole()
  }, [callSubmitAgain])


  const handleInput = (e, i) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const url = `${env.Backend_Url}/admin/change/user/${id}`;

    axios.put(url, inputData, {
      withCredentials: true
    }).then((response) => {
      if (response.data) {
        toast.success("Changes Update Successfully...", {
          position: "top-right",
          autoClose: 5000
        })
        setCallSubmitAgain(!callSubmitAgain)
        Navigate('/admin/alluser')
      }
    }).catch((error) => {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000
      })
    })
  }

  return (
    <div class="container-fluid mt-2">
      <nav class="activetab ml-2">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/admin/alluser">Admin</a></li>
          <li class="breadcrumb-item"><a href="/admin/alluser">All users</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            Update user details
          </li>
        </ol>
      </nav>
      {
        userDetails ?
          (
            <div className='container'>
              <div className='row mb-1'>
                <div className='col-3'>
                  <label for="" class="my-card-title">Name:</label>
                </div>
                <div className='col'>
                  <p class="admin-text">{userDetails.uname}</p>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-3'>
                  <label for="" class="my-card-title">Email:</label>
                </div>
                <div className='col'>
                  <p class="admin-text">{userDetails.email}</p>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-3'>
                  <label for="" class="my-card-title">Phone:</label>
                </div>
                <div className='col'>
                  <p class="admin-text">{userDetails.phone}</p>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-3'>
                  <label for="" class="my-card-title">Role:</label>
                </div>
                <div className='col'>
                  <p class="admin-text">{userDetails.role}</p>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-3'>
                  <label for="" class="my-card-title">Update Role:</label>
                </div>
                <div className='col-6'>
                  <select className="form-select mb-2" id="exampleFormControlInput1" name='changerole' onChange={handleInput}>
                    <option value="user">{"user"}</option>
                    <option value="notary">{"notary"}</option>
                    <option value="bank">{"bank"}</option>
                    <option value="admin">{"admin"}</option>
                    <option value="bank">{"bank"}</option>
                  </select>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-3'>
                  <label for="" class="my-card-title">Update status:</label>
                </div>
                <div className='col'>
                  <select className="form-select mb-2" id="exampleFormControlInput1" name='user_active' onChange={handleInput}>
                    <option value={true}>{"Active"}</option>
                    <option value={false}>{"InActive"}</option>
                  </select>
                </div>
                <div className='col-3'>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col'>
                  {
                    userDetails ? (
                      <div class="d-flex justify-content-center pt-2"> <button className='btn  w-25' style={{background:Btnbgchange, border:'none'}} onClick={(e) => onSubmit(e)}>Submit</button></div>
                    ) : ""
                  }
                </div>
              </div>
            </div>
          )
          : <h4 className='my-error-text'>User Not Found...</h4>
      }
    </div>
  )
}

export default ChangeUserRole