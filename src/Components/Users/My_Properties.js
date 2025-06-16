import React, { useEffect, useState } from "react";
import '../Assets/Styles/CommanStyle.css';
import Card1_Component from "../CommonComponents/Card1";
import addproperty from "../Assets/Images/addproperty.png";
import { useNavigate } from "react-router-dom";
import { getSpecificUserProperty } from "../../Services/UsersServices/User_Services";
import {  useAtom } from 'jotai';
import {SecondryColorSeclectorAtom} from "../CommonComponents/LandingPage";

const MY_Properties = () => {
    const[TextColorchange] = useAtom(SecondryColorSeclectorAtom)
    const [userAddedprop, setuserAddedprop] = useState('')
    let navigate = useNavigate()

    const UserAddedProperty = () => {
        getSpecificUserProperty().then(res => {
            console.log("User Added Property", res.data)
            setuserAddedprop(res.data.all_property_details)
        })
    }
    // console.log("myproperty", userAddedprop)

    useEffect(() => {
        UserAddedProperty()
    }, [])



    return (
        <>
            <div class=" d-flex gap-4 p-2 ">
                <h4 className="TopHaddings" style={{color:TextColorchange}}>My Properties</h4>
                <div> <img src={addproperty} alt="" onClick={() => navigate("/addproperty")} /></div>

            </div>
            {userAddedprop.length === 0 ? <h4 class="my-error-text ml-4"> Property Not Added Yet!</h4> :

                < div class="row gy-2 px-2" >
                    {
                        userAddedprop.length > 0 ? userAddedprop.map((carddata) => {
                            return (
                                <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <Card1_Component carddata={carddata} />
                                </div>
                            )
                        }) : null
                    }
                </div >
            }

        </>
    )
}

export default MY_Properties;