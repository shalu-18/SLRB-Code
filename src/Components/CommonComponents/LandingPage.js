import "../Assets/Styles/CommanStyle.css";
import Header from "./Header";
import '../Assets/Styles/buyerLandingpage.css';
import { AiOutlineSearch } from 'react-icons/ai';
import DropDown_component from "./DropDown";
import Card1_Component from "./Card1"
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Audio } from 'react-loader-spinner'
import { LandingdataService } from "../../Services/UsersServices/User_Services";
import { atom, useAtom } from 'jotai';
import { GetColorfromdb, GetBrandlogfromdb } from "../../Services/AdminServices/Admin_Services";

export const PrimeryColorSeclectorAtom = atom(localStorage.getItem('primaryColor') ? localStorage.getItem('primaryColor') : "#FF0F18")
export const SecondryColorSeclectorAtom = atom(localStorage.getItem('secondaryColor') ? localStorage.getItem('secondaryColor') : "#185184")
export const BrandLogoSelectorAtom = atom(localStorage.getItem('images'))
const Buyer_Landingpage = () => {
    const [buttonbackcolor, setButtonBackColor] = useAtom(PrimeryColorSeclectorAtom)
    const [TextColorchange, setTextColorchange] = useAtom(SecondryColorSeclectorAtom)
    const [landingData, setlandingData] = useState()
    const [landingMainData, setlandingMainData] = useState()
    const [areaval, setAreaval] = useState('')
    const listData = [
        { option: "Property type" },
        { option: "Apartment" },
        { option: "House" },
        { option: "Flat" }
    ]
    const listData1 = [
        { option: "Beds & Baths" },
        { option: "1" },
        { option: "2" },
        { option: "3" },
        { option: "4" },
        { option: "5" },
        { option: "6" },
        { option: "7" },
        { option: "8" },
        { option: "9" },
        { option: "10" }

    ]
    const listData2 = [
        { option: "Price" },
        { option: "10000-50000" },
        { option: "50000-100000" },
        { option: '95000000' },
        { option: "More then 100000" }

    ]
    const getallproperty = () => {
        LandingdataService().then(res => {
            console.log("123", res)
            setlandingData(res.data.property_all_details)
            setlandingMainData(res.data.property_all_details)
            setAreaval(res.data.property_all_details)

        })
    }

    //Getting Primery and Secondry color from mongodb
    const GetBothColorsfromdb = async () => {
        await GetColorfromdb().then(async (res) => {
            // console.log("geting color from db", res.data.color[0].primaryColor)
            localStorage.setItem("primaryColor", res.data.color[0].primaryColor)
            localStorage.setItem("secondaryColor", res.data.color[0].secondaryColor)
            setButtonBackColor(res.data.color[0].primaryColor)
            setTextColorchange(res.data.colo[0].secondaryColor)
        })
    }
    //Get brad log 
    const GetBrandLog = async () => {
        await GetBrandlogfromdb().then(async (res) => {
            // console.log("get brand logo", res)
            // setBrnadLogo(res.)
        })
    }
    const handleInput = (e) => {
        const result = landingMainData.filter((data) => data.property_type == e.target.value);
        setlandingData(result)
    };
    const bathandbedhandleInput = (e) => {
        const result2 = landingMainData.filter((data) => data.bedrooms == e.target.value || data.bathrooms == e.target.value);
        setlandingData(result2)

    };
    const pamounthandleInput = (e) => {
        const result3 = landingMainData.filter((data) => data.property_amount == e.target.value);
        setlandingData(result3)

    };
    const handleInput4 = (e) => {
        const result4 = areaval.filter((data) =>
            data.street == e.target.value
        );
        console.log("result4", result4)
        setlandingData(result4)

    };
    useEffect(() => {
        console.log("all property ", landingData)
        getallproperty()
        GetBothColorsfromdb()
        GetBrandLog()
    }, [])
    return (
        <>
            <Header />
            <div>
                <div class="landingpage">
                    <div class="TopText container">
                        <h1>Find your future Properties</h1>
                    </div>
                    <div className="container">
                        <div class="row pt-3">
                            <div class="col-md-3 mb-2">
                                <div class="form-group has-search ">
                                    <span class="fa fa-search form-control-feedback"><AiOutlineSearch /></span>
                                    <input type={"text"} id={"area"} name={"area"}
                                        className="form-control" placeholder={"Region or area"}
                                        arialabel={"property_transfer_fee"} onChange={(e) => handleInput4(e)} />
                                </div>
                            </div>
                            <div class="col-md-2 mb-2"><DropDown_component droplist={listData} onChange={(e) => handleInput(e)} /></div>
                            <div class="col-md-2 mb-2"><DropDown_component droplist={listData1} onChange={(e) => bathandbedhandleInput(e)} /></div>
                            <div class="col-md-2 mb-2"><DropDown_component droplist={listData2} onChange={(e) => pamounthandleInput(e)} /></div>
                        </div>
                    </div>
                </div>
                <div class="px-5 pt-4">
                    <h4 class="TopHaddings" style={{ color: TextColorchange }}>Properties in Bahrain</h4>
                    <div class="row gy-2">
                        {
                            landingData ? landingData.map((carddata) => {
                                return (
                                    <div class="col-sm-12 col-md-4 col-lg-3 ">
                                        <Card1_Component carddata={carddata} /></div>
                                )
                            }) :
                                <div>
                                    <h1>loading...</h1>
                                    <Audio
                                        height="80"
                                        width="80"
                                        radius="9"
                                        color='#FF0F18'
                                        ariaLabel='three-dots-loading'
                                        wrapperStyle
                                        wrapperclass
                                    />
                                </div>
                        }
                    </div>
                </div>
                <br />
                <div id="footer" className="mt-5">
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Buyer_Landingpage;