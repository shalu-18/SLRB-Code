import '../Assets/Styles/CommanStyle.css';
import addimg from "../Assets/Images/addimg.png";
import { useState } from 'react';
import { useAtom } from 'jotai';
import { SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 1// optional, default to 1.
    },

    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        slidesToSlide: 3 // optional, default to 1.
    },

    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }

};

const Upalodpropertyimg = (props) => {
    const[Textcolor] = useAtom(SecondryColorSeclectorAtom)
    const [sendimg, Setsendimg] = useState()


    const captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        Setsendimg(file)
        Setsendimg(URL.createObjectURL(file))

        props.sendImg(file)
        console.log("file", file);
    }

    // console.log("image is comming", sendimg)

    return (
        <>

            <div>
                <div class="d-flex justify-content-between ">
                    <h5 className="TopHaddings" style={{color:Textcolor}}>{props.title}
                        Upload Property Images</h5>
                    <div class="text-center" >
                        <label for="file">
                            <img src={addimg} alt="" />
                        </label>
                        <input
                            class="inputfile"
                            id="file"
                            type="file"
                            name="files"
                            hidden
                            multiple
                            onChange={(event) => {
                                captureFile(event);
                            }}
                        />
                    </div>
                </div>
                <div class="row row-md-6">
                    <div class="col-col-sm-4">
                        {sendimg ? <img src={sendimg}  className='card-img img-fluid' style={{ height: "13rem", width: "80rem" }}/> : ""
                        }
                    </div>
                </div>

            </div>
        </>
    )
}







export default Upalodpropertyimg;
;