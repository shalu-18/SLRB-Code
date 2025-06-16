import React from "react";
import facebook from "../Assets/Images/facebook.png";
import linkedin from "../Assets/Images/linkedin.png";
import instagram from "../Assets/Images/instagram.png";
import youtube from "../Assets/Images/youtube.png";
import "../Assets/Styles/CommanStyle.css";
const Footer = () => {
  return (
    <section class=" fixed-bottom  pt-0 bg-light align-items-center ">
      <div class="row d-flex align-items-center">
        <div class="col-md-7 col-lg-8 text-center text-md-start">
          <div class="p-3">
            <a class="my-card-text" href="/AboutUs" >About Us  | </a>
            <a class="my-card-text" href="/TermsConditions" >Terms & Conditions  | </a>
            <a class="my-card-text" href="/PrivacyPolicy"  >Privacy & Policy </a>
          </div>

        </div>
        <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">      
              <img
          class="m-1"
          src={instagram}
          alt="instagram"
          onClick={() => window.open("https://www.instagram.com/rapidqubebahrain/")
          }
        />            <img
            class="m-1"
            src={linkedin}
            alt="instagram"
            onClick={() => window.open("https://www.linkedin.com/company/rapidqube-bahrain", "_blank")
            }
          />            <img
            class="m-1"
            src={youtube}
            alt="youtube"
            onClick={() => window.open("https://www.youtube.com/channel/UCkwqExwAISY_9yYinPUWYpg")
            }
          />            <img
            class="m-1"
            src={facebook}
            alt="facebook"
            onClick={() => window.open("https://www.facebook.com/RapidQubeBahrain", "_blank")
            }
          />          </div>        </div>      </section>
  );
};

export default Footer;
