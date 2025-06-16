import React from 'react'
import '../Assets/Styles/CommanStyle.css'
import { useAtom } from 'jotai';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"
import { SecondryColorSeclectorAtom } from "./LandingPage";
import Header from "./Header";
const TermsConditions = () => {

  const [TextColorchange] = useAtom(SecondryColorSeclectorAtom)
  return (
    <>
      <Header />
      <div class="container-fluid p-3">
        <nav class="activetab">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Terms & conditions</li>
          </ol>
        </nav>
        <div>
          <h2 class="TopHaddings" style={{ color: TextColorchange }}>Terms and Conditions</h2>
          <h6>  The use of complete or partial excerpts from the data context of the SLRB website in the original or altered forms for public benefit is permitted on the following conditions:</h6>
          <div class="row">
            <ul class="my-card-text2">
              <li>Use of all text, images, photographs, and audio visual content is permitted for reference, educational purposes, and general awareness, with the exception of the SLRB logo, which can only be used for reference in presentations or printed matter with prior written consent.</li>
              <li>Any personal photograph displayed on the website is property of its owner, and therefore can only be used with their approval after obtaining the SLRB's approval.</li>
              <li>Publishing content from the website by unauthorized parties on forums or personal websites is strictly prohibited without a prior written consent from the SLRB.</li>
              <li>Using content from the website in products and services for commercial purposes – whether in its original or abridged versions – is strictly prohibited.
              </li>
              <li>Parties that display material from the website should by all evident means notify the SLRB due to its role as the source of information.
              </li>
              <li>Claiming ownership of website content, or failing to quote the resource as a data reference is considered illegal, and puts offenders at risk of facing legal action at the SLRB's will.
              </li>
              <li>The SLRB is not responsible whatsoever for claims, expenses, or other consequences resulting from any individual or party's use of information displayed on the website.
              </li>
              <li>The SLRB does not grant exclusive rights to use material published on its website. Hence, any claims that the material is exclusive or copyrighted are considered void, and violators risk facing any legal action the SLRB finds appropriate within the capacities allowed by the Bahraini law.
              </li>
              <li>The SLRB does not endorse any products, services, or commercial activities. Therefore, claims of such nature are considered void, and violators risk facing any legal action the SLRB finds appropriate within the capacities allowed by the Bahraini law.
              </li>
              <li>Only parts of the website displaying copyright information are considered protected under intellectual rights. Thus, reproduction of material with no copyright information does not require prior approval from the SLRB.
              </li>
              <li>If non-copyrighted material includes excerpts of copyrighted material or material that is SLRB-specific, then users should obtain prior approval from the SLRB or the material's intellectual owner, or list proper references when displaying the quoted material.
              </li>
              <li>The SLRB may permit the use of its logo in the production of memorabilia (i.e. shields, collectibles, etc.) should a party approach it with such a request, given that the objectives of such a request are clearly expressed in written form. Sale of such items is by all means prohibited, and exclusive production rights are strictly denied.
              </li>
              <li>External links featured in the official SLRB website are by no means part of the website, and the SLRB assumes no responsibility whatsoever for the material displayed on their corresponding websites.
              </li>
              <li>Privacy Policy & Disclaimers   The SLRB spa... by Mahendran Kangaraj
              </li>
            </ul>
          </div>
          <hr></hr>
          <h6>Privacy Policy & Disclaimers</h6>
          <div class="my-card-text2">
            <p>The SLRB spares no effort in ensuring the convenience and security of its online resources and communication channels for the sake of its websites visitors and users, in accordance with the rules and regulations of the Kingdom of Bahrain.
              However, it is necessary to note that online communication is not fully secure due to the nature of the internet. Thus, there is no guarantee that any exchange of email messages is free from viruses and other forms of malicious software. Hence, it is only appropriate – out of the SLRB's responsibility towards its website visitors – to advise caution when opening email messages from unknown sources or ones containing suspicious attachments. The SLRB's sole responsibility is restricted to providing safe browsing of its website and service-specific messages contained and sent through it.
              Certain functionalities of some website materials depend on cookies to gather basic operational data from computers accessing the website for specification enhancements and statistical purposes in order to enhance the services provided through the website. Any information collected is confidential and is by no means used for purposes other than those stated hereby. No personal information is collected through cookies nor is that an intention of ours now or in the future. The cookie feature can be turned off at the users' choice. All information is used according to the previously stated purpose and will not be disclosed except to legal authorities in cases of criminal investigations or court orders and their related objectives.
            </p>
          </div>
          <hr></hr>
          <h6>Email Policy</h6>
          <div class="my-card-text2">
            User-specific information (i.e. name, email address) appearing in email sent to the SLRB or through e-forms filled and submitted through the website may be stored within website records or the SLRB database should the information be service-related and useful for reference when tracking application status or answering email inquiries and interacting with users. However, sending financial information (account/credit card numbers) through emails is strictly discouraged to avoid unauthorized use in case of an email breach.
            <hr></hr>
            <h6>Online Security of the Website</h6>
            <p>
              In order to preserve the SLRB's sensitive informative status as part of the mainstream government data network, both the SLRB and the Information & e-Government Authority use advanced data security and protection measures and solutions to safeguard the information contained within their respective networks, and constantly monitor all applications and activities that take place in order to identify and deal with any cases of risky illegal activity as defined by Bahraini regulations for such matters.
              The rights are reserved for the SLRB – in case of tracing and identifying violations of destructive or criminal natures – to submit all data related to the incident to the authorities for use in the legal prosecution of the perpetrators.
            </p>
          </div>
          <hr></hr>
          <h6>Amendments to the Privacy Policy</h6>
          <p class="my-card-text2">
            The SLRB has the right to apply any change – partial or whole – it considers appropriate and beneficial to public interest, and it may or may not notify website users and visitors without a prior approval from any party.</p>
        </div>
        <ScrollUpButton
          ContainerClass='ScrollUpButton__TopHaddings'
        />

      </div>
    </>
  )
}

export default TermsConditions