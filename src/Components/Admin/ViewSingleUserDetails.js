import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import '../../Components/Assets/Styles/Admin.css'
import env from "../../Environment/Enviroment";

const ViewSingleUserDetails = () => {

    const [userDetails, setUserDetails] = useState()
    const { id } = useParams()

    useEffect(() => {
        const url = `${env.Backend_Url}/admin/view/user/${id}`;
        const viewSingleUser = async () => {
            axios.get(url, {
                withCredentials: true
            }).then((response) => {
                if (response.data) {
                    console.log(response.data.user.user_active);
                    setUserDetails(response.data.user)
                }

            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 5000
                })
            })

        }
        viewSingleUser()
    }, [])



    return (
        <div class="container mt-2">
             <nav class="activetab ml-2">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/admin/alluser">Admin</a></li>
                            <li class="breadcrumb-item"><a href="/admin/alluser">All users</a></li>
                            <li class="breadcrumb-item active" aria-current="page">User Details</li>
                        </ol>
                    </nav>
            {
                userDetails ?
                    (
                        <div className="offset-lg-0 p-2">
                            <div className='row'>
                                <div className='col-2'>
                                    <label for="" class="my-card-title">User Name:</label>
                                </div>
                                <div className='col'>
                                    <p class="admin-text"> {userDetails.uname}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label for="" class="my-card-title">Email:</label>
                                </div>
                                <div className='col'>
                                    <p class="admin-text">{userDetails.email}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label for="" class="my-card-title">User Role:</label>
                                </div>
                                <div className='col'>
                                    <p class="admin-text"> {userDetails.role}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label for="" class="my-card-title">Phone:</label>
                                </div>
                                <div className='col'>
                                    <p class="admin-text">{userDetails.phone}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label for="" class="my-card-title">Status:</label>
                                </div>
                                <div className='col'>
                                    <p class="admin-text">{userDetails.user_active === true ? "Active" : "InActive"}</p>

                                </div>
                            </div>
                        </div>
                    )
                    : <h4 className='Nopropertyheadingr'>User Not Found...</h4>
            }
           
            <ToastContainer />

        </div>
    )
}

export default ViewSingleUserDetails