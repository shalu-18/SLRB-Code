import React from "react";
import '../Assets/Styles/CommanStyle.css'
import Header from "./Header";
import Footer from "./Footer";
import {  useAtom } from 'jotai';
import {SecondryColorSeclectorAtom} from "./LandingPage";

const AboutUs = () => {
  const[TextColorchange] = useAtom(SecondryColorSeclectorAtom)
  return (
    <>
      <Header />
      <div class="container-fluid pt-3">
        <nav class="activetab">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Aboutus</li>
          </ol>
        </nav>
        <h2 class="TopHaddings" style={{color:TextColorchange}}>
          About Us
        </h2>
        <p class="my-card-text2">
          RapidQube Digital is a disruptive, results-driven, next-gen IT services
          provider solving the modern digital challenges and assisting customers
          to adopt digital technologies with best-in-class services. We help
          accelerate digital transformation through the development and deployment
          of cutting-edge solutions applying the blockchain ecosystem along with
          IoT, Machine Learning (ML), Integration, and in the omnichannel space.


          We are driven by passion, innovation, and commitment, to adapt to the
          digital shift through the robust use of futuristic technologies. Our
          goal is to continue to push the boundaries of the digital ecosystem
          across varied business verticals.


          We are pioneers in solving complex problems and bringing best fit robust
          solutions that are engineered with Quality by working with like-minded
          cutting-edge technology partners.
        </p>


        <Footer/>
      </div>
    </>
  );
};

export default AboutUs;
