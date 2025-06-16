import React, { useState, useEffect } from "react";
import '../Assets/Styles/CommanStyle.css';
import Cards_Component from "../CommonComponents/Cards";
import { getUserBidDetails } from "../../Services/UsersServices/User_Services";
import {  useAtom } from 'jotai';
import {SecondryColorSeclectorAtom} from "../CommonComponents/LandingPage";

const MY_Bride_Page = () => {
    const[TextColorchange] = useAtom(SecondryColorSeclectorAtom)
    const [userBid, setUserBid] = useState();
    const UserBidData = () => {
        getUserBidDetails().then(res => {
            console.log("userbid", res)
            setUserBid(res.data.result)
        })
    }
    useEffect(() => {
        UserBidData()

    }, [])
    return (
        <>
            <h4 class="TopHaddings p-2" style={{color:TextColorchange}}>{userBid?.length == 0? <h6 class="Nopropertyheading">No Bid Details Available...</h6> : "Bid Properties "} </h4>
            <div class="row gy-2 px-2" >
                {
                    userBid ? userBid.map((carddata) => {
                        return (

                            <div class="col-sm-6 col-md-4 col-lg-3 mb-2 ">
                                <Cards_Component carddata={carddata} />
                            </div>
                        )
                    }
                    )
                        : null
                }

            </div >
        </>
    )
}

export default MY_Bride_Page;