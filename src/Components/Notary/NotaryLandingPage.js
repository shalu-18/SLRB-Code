import React, { useState } from 'react'
import { tabData } from '../CommonComponents/AllTabs';
import TabDynamicCom from '../CommonComponents/TabDynamicCom';
import NotaryProperties_PENDING_Page from './NotaryProperties_PENDING_Page';
import NotaryProperties_TODO_Page from './NotaryProperties_TODO_Page';
import NotaryProperties_VERIFIED_Page from './NotaryProperties_VERIFIED_Page';
import Header from "../CommonComponents/Header";
import Footer from '../CommonComponents/Footer';

const NotaryLandingPage = () => {

    const [allTabs, setAllTabs] = useState(tabData["alltabs"]);
    const [selectedTab, setSelectedTab] = useState("Pending");

    const ShowCurrentPage = () => {
        if (selectedTab === "Active") {
            return <NotaryProperties_TODO_Page />

        } else if (selectedTab === "Pending") {
            return <NotaryProperties_PENDING_Page handleTabChange={handleTabChange} />

        } else if (selectedTab === "Verified") {
            return <NotaryProperties_VERIFIED_Page />
        }
    }

    const handleTabChange = (getTitle) => {
        setSelectedTab(getTitle)
    }

    return (
        <>
            <Header />
            <div className='Top_Div'>
                <div className='col-md-12 gap-2'>
                    <p>{`Properties > ${selectedTab}`}</p>
                    <TabDynamicCom allTabs={allTabs} handleTabChange={handleTabChange}
                        spanclassName={"p-2"}
                        divClssName={"d-flex"} backgroundColor={"#FF0F18"}
                    />
                    <ShowCurrentPage  />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NotaryLandingPage
