import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import env from "../../Environment/Enviroment";

const DeleteSingleUser = () => {

  const { id } = useParams()
  const Navigate = useNavigate()

  useEffect(() => {

    const url = `${env.Backend_Url}/admin/delete/user/${id}`;
    const deleteUser = async () => {
      axios.delete(url, {
        withCredentials: true
      }).then((response) => {
        if (response.data) {
          Navigate("/admin/alluser")
        }
      }).catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000
        })
      })

    }
    deleteUser()
  }, [])

  return (
    <div className='text-center'>
      <ToastContainer />
    </div>
  )
}

export default DeleteSingleUser