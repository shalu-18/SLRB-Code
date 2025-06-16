import React, { useState } from 'react'
import { AdmintabData } from '../CommonComponents/AllTabs';
import TabDynamicCom from '../CommonComponents/TabDynamicCom';
import AdminProperties_TODO_Page from './adminProperties_TODO_Page';
import AdminProperties_VERIFIED_Page from './adminProperties_VERIFIED_Page';
import {  useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const AdminPropertyPage = () => {
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    const [allTabs, setAllTabs] = useState(AdmintabData["alltabs"]);
    const [selectedTab, setSelectedTab] = useState("Active");

    const ShowCurrentPage = () => {
        if (selectedTab === "Pending") {
            return <AdminProperties_TODO_Page />

        } else if (selectedTab === "Verified") {
            return <AdminProperties_VERIFIED_Page />
        }
    }

    const handleTabChange = (getTitle) => {
        setSelectedTab(getTitle)
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='col-md-12 gap-2'>
                    <p>{`Properties > ${selectedTab}`}</p>
                    <TabDynamicCom allTabs={allTabs} handleTabChange={handleTabChange}
                        spanclassName={"p-2"}
                        divClssName={"d-flex"} backgroundColor={Btnbgchange}
                    />
                    <ShowCurrentPage />
                </div>
            </div>
        </>
    )
}

export default AdminPropertyPage
