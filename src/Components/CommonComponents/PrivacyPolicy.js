import React from 'react'
import '../Assets/Styles/CommanStyle.css'
import Header from "./Header";
import { useAtom } from 'jotai';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { SecondryColorSeclectorAtom } from "./LandingPage";

const PrivacyPolicy = () => {
  const [TextColorchange] = useAtom(SecondryColorSeclectorAtom)
  return (
    <>
      <Header />
      <div class="container-fluid pt-3">
        <div>
          <nav class="activetab">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Privacy Policy & Disclaimers</li>
            </ol>
          </nav>
          <h2 class="TopHaddings" style={{ color: TextColorchange }}>Privacy Policy & Disclaimers</h2>
          <div class="my-card-text2">
            The SLRB spares no effort in ensuring the convenience and security of its online resources and communication channels for the sake of its websites visitors and users, in accordance with the rules and regulations of the Kingdom of Bahrain.
            However, it is necessary to note that online communication is not fully secure due to the nature of the internet. Thus, there is no guarantee that any exchange of email messages is free from viruses and other forms of malicious software. Hence, it is only appropriate  out of the SLRB's responsibility towards its website visitors – to advise caution when opening email messages from unknown sources or ones containing suspicious attachments. The SLRB's sole responsibility is restricted to providing safe browsing of its website and service-specific messages contained and sent through it.
            Certain functionalities of some website materials depend on cookies to gather basic operational data from computers accessing the website for specification enhancements and statistical purposes in order to enhance the services provided through the website. Any information collected is confidential and is by no means used for purposes other than those stated hereby. No personal information is collected through cookies nor is that an intention of ours now or in the future. The cookie feature can be turned off at the users' choice. All information is used according to the previously stated purpose and will not be disclosed except to legal authorities in cases of criminal investigations or court orders and their related objectives.
          </div>
          <hr></hr>
          <h6>Email Policy</h6>
          <p class="my-card-text2">User-specific information (i.e. name, email address) appearing in email sent to the SLRB or through e-forms filled and submitted through the website may be stored within website records or the SLRB database should the information be service-related and useful for reference when tracking application status or answering email inquiries and interacting with users. However, sending financial information (account/credit card numbers) through emails is strictly discouraged to avoid unauthorized use in case of an email breach.
          </p>
          <hr></hr>
          <h6>Online Security of the Website</h6>
          <div class="my-card-text2">
            In order to preserve the SLRB's sensitive informative status as part of the mainstream government data network, both the SLRB and the Information & e-Government Authority use advanced data security and protection measures and solutions to safeguard the information contained within their respective networks, and constantly monitor all applications and activities that take place in order to identify and deal with any cases of risky illegal activity as defined by Bahraini regulations for such matters.
            The rights are reserved for the SLRB in case of tracing and identifying violations of destructive or criminal natures to submit all data related to the incident to the authorities for use in the legal prosecution of the perpetrators.
          </div>
          <hr></hr>
          <h6>Amendments to the Privacy Policy</h6>
          <p class="my-card-text2">
            The SLRB has the right to apply any change partial or whole it considers appropriate and beneficial to public interest, and it may or may not notify website users and visitors without a prior approval from any party.</p>

        </div>

        <ScrollUpButton
          ContainerClass='ScrollUpButton__TopHaddings'
        />
      </div>
    </>
  )
}

export default PrivacyPolicy