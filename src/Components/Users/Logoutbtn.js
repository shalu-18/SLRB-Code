import React, { useState } from 'react';
import { DownOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const LogOutbtn = ({ onClick, username }) => {
   const [localvalue, setLocalValue] = useState(JSON.parse(localStorage.getItem("Logindata")))
   const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const navigate = useNavigate();
    const items = [
        {
            key: '1',
            label: (
                <a onClick={(e) => Dashbordfunction(e)} >
                    Dashbord
                </a>
            ),
            icon: <AppstoreOutlined />
        },
        {
            key: '2',
            label: (
                <a target="_blank" >
                    Settings
                </a>
            ),
            icon: <SettingOutlined />,
        },

        {
            key: '3',
            // danger: true,
            label: (
                <a class="btn " style={{color:'white', background:Btnbgchange}} onClick={(e) => onClick(e)}  >
                    Logout
                </a>
            ),
        },
    ];

    const Dashbordfunction = (e) => {
        e.preventDefault()
        setLocalValue(JSON.parse(localStorage.getItem("Logindata")))
         console.log("DashbordforNotary", localvalue.email)
        if (localvalue.email === "notary@gmail.com") {
            navigate('/notary',{
                state: {
                    id: localvalue._id
                }
            }
            )
        }
        else if(localvalue.email ==="admin@rapidqube.com"){
            navigate('/admin/alluser',{
                state: {
                    id: localvalue._id
                }
            }
            )
        }
        else {
            navigate('/myproperties')
        }
    }

    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {username}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </>
    )

};
export default LogOutbtn;