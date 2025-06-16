import Header from "../CommonComponents/Header";
import '../Assets/Styles/CommanStyle.css'
import Sidebar from "../CommonComponents/Sidemenu";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vector from "../Assets/Images/Vector.png";
import file from "../Assets/Images/file-text.png";
import setting from "../Assets/Images/settings.png";

const AdminLayout = ({ children }) => {
    const sideNavList = [
        {
            name: 'Users',
            img: file,
            index: 2,
            visible: true,
            link: "admin/alluser"
        },
        {
            name: "Properties",
            img: vector,
            index: 3,
            visible: false,
            link: "adminproperty",

        },
        // {
        //     name: 'Settings',
        //     img: setting,
        //     index: 5,
        //     visible: false,
        //     link: "adminsetting"
        // },
        {
            name: 'Customize',
            img: setting,
            index: 6,
            visible: false,
            link: "customize"
        },
    ]
    const [sideMenus, setSideMenus] = useState(sideNavList)

    let navigate = useNavigate();

    const sidehandleChangeTitle = (data) => {
        // console.log("inx checking", data)
        sideMenus.map(item => {
            if (item.index === data.index) {
                item.visible = true
                localStorage.setItem("SelectedMenuItem", data.name)
            } else {
                item.visible = false
            }
            return item
        })
        setSideMenus([...sideMenus])
        navigate(`/${data.link}`)
    }

    useEffect(() => {
        sideNavList.map((data) => {
            if (data.name === localStorage.getItem("SelectedMenuItem")) {
                sidehandleChangeTitle(data);
            }
        });
    }, [localStorage.getItem("SelectedMenuItem")]);

    return (
        <>
            <Header />
            <div className=''  >
                <div className="row commonstyle" >
                    <div className="col-md-2 sidebarstyle">
                        <Sidebar
                            sideMenus={sideMenus}
                            sidehandleChangeTitle={sidehandleChangeTitle} />
                    </div>
                    <div className="col-md-10 contentbarstyle">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminLayout;