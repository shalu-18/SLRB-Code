import React from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import "../../Components/Assets/Styles/Admin.css"
import { Link } from "react-router-dom"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "../Assets/Styles/aggridStyles.css"
import env from "../../Environment/Enviroment";
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom } from "../CommonComponents/LandingPage";

const Admin_Dashbord = () => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [storeAllUsers, setStoreAllUsers] = useState([])

    useEffect(() => {
        const getAllUsers = () => {
            const url = `${env.Backend_Url}/admin/alluser`;
            axios.get(url, {
                withCredentials: true
            })
                .then((response) => {
                    console.log(response.data.users)
                    if (response.data) {
                        setStoreAllUsers(response?.data.users)
                        setStoreAllUsers.map(header => {

                        })

                    }
                })
                .catch((error) => {
                    toast.error(error.response?.data.message, {
                        position: "top-right",
                        autoClose: 5000
                    })
                })
        }
        getAllUsers()
    }, [])

    return (
        <>
            <table class="table table-hover" style={{ width: '100%' }}>
                <thead style={{ background: Btnbgchange }}>
                    <tr class="my-card-text" style={{ color: 'white' }} >
                        <th scope="col">Sr No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storeAllUsers.map((users, index) => {
                            return (
                                <tr class="my-card-text">
                                    <td>{index + 1}</td>
                                    <td>{users.uname}</td>
                                    <td>{users.email}</td>
                                    <td>{users.phone}</td>
                                    <td>{users.role}</td>
                                    <td>
                                        <Link to={`/admin/view/user/${users._id}`}>
                                            <EyeOutlined style={{ color: "blue" }} />
                                        </Link>

                                        <Link to={`/admin/change/user/${users._id}`}>
                                            <EditOutlined style={{ color: "green", marginLeft: '10px' }} />
                                        </Link>

                                        <Link to={`/admin/delete/user/${users._id}`}>
                                            <DeleteOutlined style={{ color: "red", marginLeft: '10px' }} />
                                        </Link></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )


}
//     const [TableHeadercolor] = useAtom(PrimeryColorSeclectorAtom)
//     const [storeAllUsers, setStoreAllUsers] = useState([])
//     const [columnDefs] = useState([
//         {headerName: "User", field: 'uname', width: 250, },
//         { headerName: "Email", field: 'email', width: 500 },
//         { headerName: "Role", field: 'role' },


//         {
//             "headerName": "Actions", field: "id", cellRendererFramework: (params) => {
//                 return (
//                     <div className='d-flex'>
//                         <div className='m-1'>
//                             <Link to={`/admin/view/user/${params.data._id}`}>
//                                 <EyeOutlined style={{ color: "blue" }} />
//                             </Link>
//                         </div>
//                         <div className='m-1'>
//                             <Link to={`/admin/change/user/${params.data._id}`}>
//                                 <EditOutlined style={{ color: "green" }} />
//                             </Link>
//                         </div>
//                         <div className='m-1'>
//                             <Link to={`/admin/delete/user/${params.data._id}`}>
//                                 <DeleteOutlined style={{ color: "red" }} />
//                             </Link>
//                         </div>
//                     </div>
//                 )
//             },
//             width: 280,

//         },
//     ])

//     useEffect(() => {
//         const getAllUsers = () => {
//             const url = `${env.Backend_Url}/admin/alluser`;
//             axios.get(url, {
//                 withCredentials: true
//             })
//                 .then((response) => {
//                     // console.log(response.data.users)
//                     if (response.data) {
//                         setStoreAllUsers(response?.data.users)
//                     }
//                 })
//                 .catch((error) => {
//                     toast.error(error.response?.data.message, {
//                         position: "top-right",
//                         autoClose: 5000
//                     })
//                 })
//         }
//         getAllUsers()
//     }, [])

//     return (
//         <>
//             <div className="container ag-theme-alpine" style={{ height: '100%', width: '100%', }}>
//                 <AgGridReact
//                     rowData={storeAllUsers}
//                     columnDefs={columnDefs} >
//                 </AgGridReact>
//             </div>

//         </>
//     )
// }

export default Admin_Dashbord;