import { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { Colorchanging, Brandlogo, CountryLogo } from "../../Services/AdminServices/Admin_Services";
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"
import { useNavigate } from "react-router-dom";

const AdminCustomizepage = () => {
    const [buttonbackcolor, setButtonBackColor] = useAtom(PrimeryColorSeclectorAtom)
    const [TextColorchange, setTextColorChange] = useAtom(SecondryColorSeclectorAtom)
    const [GetBrandlogo, setGetBrandlogo] = useState()
    const [GetCountrylogo, setGetCountrylogo] = useState()
    const [sendimg, Setsendimg] = useState()
    const [Countrylogo, setCountrylog] = useState()
    const [inputData, setInputData] = useState(
        {
            primaryColor: "",
            secondaryColor: "",
        }
    )
    const inputhandeler = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }
    const captureFile = (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log(event.target)
        let file = event.target.files[0];
        if (event.target.name === "countrylogo") {
            setGetCountrylogo(file)
            setCountrylog(URL.createObjectURL(file))
        } else if (event.target.name === "brandlogo") {

            setGetBrandlogo(file)
            Setsendimg(URL.createObjectURL(file))
        }
        console.log("file", file);
    }




    const Navigate = useNavigate()
    const SubmitColor = async () => {

        const newColor = inputData.primaryColor
        setButtonBackColor(newColor)
        const TextColor = inputData.secondaryColor

        setTextColorChange(TextColor)
        await Colorchanging(inputData).then((res) => {
            console.log("Primery color changing", res)
            Navigate('/')


        })
    }

    const Brandlogoposting = async () => {
        const FormDataval = new FormData()
        console.log("getbrand", GetBrandlogo)
        FormDataval.append("images", GetBrandlogo, GetBrandlogo.name)
        await Brandlogo(FormDataval).then((res) => {
            console.log("Brand logo uploaded", FormDataval)
            window.location.reload()
        })
    }

    const CountryLogoposting = async () => {
        const FormDataval = new FormData()
        FormDataval.append("images", GetCountrylogo, GetCountrylogo.name)
        await CountryLogo(FormDataval).then((res) => {
            window.location.reload()

        })
    }
    return (
        <>
            <div class="container">
                <div>
                    <h6 class="TopHaddings" style={{ color: TextColorchange }}>Customize </h6>
                    <p class="my-card-text">Customize Your own UI by selecting your favourite colors and logo.</p>
                </div>

                <div class="row">
                    <div class="col-md-4">
                       
                        <div class="card">
                            <div class="card-body">
                                <label class="my-card-title ">Brand Logo</label>
                                <div>
                                    <img src={sendimg} class="img-fluit" style={{ width: '241px', height: "50px" }} />
                                </div>
                                <div class="mt-2">
                                    {sendimg ? <button class="btn btn-danger btn-sm " style={{ background: buttonbackcolor, border: 'none', color: 'white', width: '241px' }} onClick={() => CountryLogoposting()}>Submit</button> :
                                        <div class="">
                                            <label for="file">
                                                <a class="btn btn-danger btn-sm" style={{ background: buttonbackcolor, width: '241px', border: 'none', color: 'white' }} >Add Image</a>
                                            </label>
                                            <input
                                                class="inputfile"
                                                id="file"
                                                type="file"
                                                name="brandlogo"
                                                hidden
                                                onChange={(event) => {
                                                    captureFile(event);
                                                }}
                                            />
                                        </div>}

                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <label class="my-card-title ">Country Logo</label>
                                <div class="">
                                    <img src={Countrylogo} class="img-fluit" style={{ width: '241px', height: "50px" }} />
                                </div>
                                <div class="mt-2">
                                    {Countrylogo ? <button class="btn btn-danger btn-sm " style={{ background: buttonbackcolor, border: 'none', color: 'white', width: '241px' }} onClick={() => Brandlogoposting()}>Submit</button> :
                                        <div class="">
                                            <label for="file">
                                                <a class="btn btn-danger btn-sm" style={{ background: buttonbackcolor, width: '241px', border: 'none', color: 'white' }} >Add Image</a>
                                            </label>
                                            <input
                                                class="inputfile"
                                                id="file"
                                                type="file"
                                                name="countrylogo"
                                                hidden
                                                onChange={(event) => {
                                                    captureFile(event);
                                                }}
                                            />
                                        </div>}

                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <label class="my-card-title ">Select Color</label>
                                <div class="row d-flex">
                                <div class="col">
                                    <label class="my-card-title">Primary Color</label>
                                    <input type="color" style={{ width: '8rem' }} value={inputData.primaryColor} onChange={inputhandeler} name="primaryColor" />
                                </div>

                                <div class="col">
                                    <label class="my-card-title">Secondary Color</label>
                                     <input type="color" style={{ width: '8rem' }} value={inputData.secondaryColor} name="secondaryColor" onChange={inputhandeler} />
                                </div>
                                </div>
                                <div class="mt-2">  <button class="btn btn-danger btn-sm"
                                    style={{ background: buttonbackcolor, width: '18rem', border: 'none', color: 'white' }} onClick={SubmitColor}>Submit</button></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default AdminCustomizepage;