import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { propertyBidDetails, createTransaction,Propertyplsceformarketing,RevertProperty } from "../../Services/UsersServices/User_Services";
import Button_Component from "../CommonComponents/Button";
import { PhoneOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../CommonComponents/LandingPage"

const RequestList = () => {
  const[TextColorchange] = useAtom(SecondryColorSeclectorAtom)
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const [Singleprop, setSingleprop] = useState();
  const [checkbox, setcheckbox] = useState([]);
  const [checkboxval, setCheckboxVal] = useState()
  const { state } = useLocation();
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [bidderSelected, setBidderSelected] = useState(false);
  const [Sellbtn, setSellbtn] = useState(false)
  const Navigate = useNavigate()
  const handleCheckboxChange = (data, index) => {
    if (data.checked) {
      checkbox.find((a) => a.index == index).checked = false;
      let user = checkbox.find((a) => a.index == index);
      setCheckboxVal(user)
      setcheckbox(checkbox);
      setSelectedCheckbox(!selectedCheckbox);
    } else {
      if (!selectedCheckbox) {
        checkbox.find((a) => a.index == index).checked = true;
        let user = checkbox.find((a) => a.index == index);
        setCheckboxVal(user)
        setcheckbox(checkbox);
        setSelectedCheckbox(!selectedCheckbox);
      }
    }
  };

  const CreateTransaction = () => {
    console.log("dsf", checkboxval)
    if (selectedCheckbox) {
      createTransaction({ property_id: Singleprop._id, buyerId: checkboxval.bid_user_id, property_name: Singleprop.property_name, bid_amount: checkboxval.bid_amount }).then((res) => {
        console.log("createTransaction", res)
        if (res.status == 200) {
          Navigate('/transaction', { state: { id: Singleprop._id } })
        } else {
          toast.error("Transaction can't be initialised. Try again later.")
        }
      })
    }
    else {
      toast.error("Select any bid.")
    }
  }

  const [disData, setDisData] = useState();

  const GetSinglePropertyData = async () => {
    try {
      await propertyBidDetails(state?.id).then((res) => {
        console.log("requestList", res)
        setSingleprop(res.data.all_property_details);
        setDisData(res.data);
        getchechboxes(res.data.all_property_details);
        setSellbtn(res.data.all_property_details.sellStatus)
      });
    } catch (err) {
      window.alert(err);
    }
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const PlacePropertyforsell = async () => {
    await Propertyplsceformarketing(state?.id).then((res) => {
      if (res.data.success == true) {
        setSellbtn(false)
      }
      console.log("Sell current Property..", res)

    })
  }

  const RevertListing = async () => {
    await RevertProperty(state?.id).then((res) => {
      if (res.data.success == true) {
        setSellbtn(true)
      }
      console.log("Revert  Property..", res.data.success)

    })
  }

  useEffect(() => {
    if (!Singleprop) {
      GetSinglePropertyData();
    }
  }, [state, Sellbtn]);

  const getchechboxes = (checkData) => {
    if (checkbox.length == 0) {
      checkData.bid_user_details.map((data, index) => {
        let obj = {
          bid_amount: data.bid_amount,
          bid_user_id: data.bid_user_id._id,
          bid_user_name: data.bid_user_id.uname,
          phone: data.bid_user_id.phone,
          checked: data.bid_status == "approved" ? true : false,
          index: index,
        };
        checkbox.push(obj);
        setcheckbox(checkbox);
        setSelectedCheckbox(data.bid_status == "approved" ? true : false)
        setBidderSelected(data.bid_status == "approved" ? true : false)
      });
    }
  };

  return (
    <>
      <div class="container">
        <div className="pt-2 d-flex justify-content-between">
          <h5 className="TopHaddings" style={{color:TextColorchange}}>Request Lists</h5>
          {
            Sellbtn ? <button class="btn btn-danger btn-sm" style={{background:Btnbgchange, border:'none'}} onClick={RevertListing}>Revert Listing</button> :
              <button class="btn btn-danger btn-sm"  style={{background:Btnbgchange,border:'none'}} onClick={PlacePropertyforsell}>List Property</button>
          }
        </div>
        <div class="row">
          <div class="col-md-3">
            <img
              src={`data:image/png;base64,${_arrayBufferToBase64(
                Singleprop?.images[0].data
              )}`}
              class="img-fluid"
              alt="image "
            />
          </div>
          <div class="col">
            <div class="container">
              <div class="row">
                <h6 class="my-card-text">{Singleprop?.property_type} For Sale in {Singleprop?.city}</h6>
                <div class="col-md-5">
                  <div class="row">
                    <div class="col"><h6>Property Name :</h6></div>
                    <div class="col my-card-text1">{Singleprop?.property_name}</div>
                  </div>
                  <div class="row">
                    <div class="col"><h6>Property Type :</h6></div>
                    <div class="col my-card-text1">{Singleprop?.property_type}</div>
                  </div>
                  <div class="row">
                    <div class="col"><h6> Amount :</h6></div>
                    <div class="col my-card-text">{Singleprop?.property_amount} BD</div>
                  </div>
                  <div class="row">
                    <div class="col"><h6>Bedrooms :</h6></div>
                    <div class="col my-card-text1">{Singleprop?.bedrooms}</div>
                  </div>
                  <div class="row">
                    <div class="col"><h6>Bathrooms :</h6></div>
                    <div class="col my-card-text1">{Singleprop?.bathrooms}</div>
                  </div>
                  <div class="row">
                    <div class="col"><h6>Notary Status:</h6></div>
                    <div class="col">{Singleprop?.notary_status === "" ? <div class="my-card-text">Pending</div> : <div class=" my-card-text">{Singleprop?.notary_status}</div>}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col">
                      <h6>  Address / Location</h6>
                      <h5 class=" my-card-text">{Singleprop?.city} {Singleprop?.street} {Singleprop?.country}{Singleprop?.pincode}</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <h6> Bank Details</h6>
                      <h5 class=" my-card-text">{Singleprop?.account_holder_name} {Singleprop?.account_no}
                        {Singleprop?.bank_name} {Singleprop?.ifsc_code}</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <h6> Description </h6>
                      <h5 class="my-card-text">{Singleprop?.description}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Singleprop?.bid_user_details.length === 0 ? "mt-4" : "card mt-4"}>
          <div className="col-sm-12">
            {Singleprop?.bid_user_details.length === 0 ? (
              <p>
                <h5 className="Nopropertyheading ">No Bid Details Available...</h5>
              </p>
            ) : (
              <h5 className="TopHaddings" style={{color:TextColorchange}}>Bid Details</h5>
            )}
          </div>
          <div className="row g-3 px-3">
            {checkbox
              ? checkbox.map((value, index) => {
                // console.log("requestlist", value)
                return (
                  <>
                    <div className="col-sm-4 ">
                      <div class="form-check">
                        <label key={value}>
                          <input
                            class="form-check-input"
                            className={Singleprop.className}
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange(value, index)
                            }
                            checked={value.checked}
                          />
                          <h6 class="my-card-text">{value.bid_user_name}</h6>
                        </label>
                      </div>
                      <div class="d-flex gap-2"><PhoneOutlined /><h6 class="my-card-text">{value.phone}</h6> </div>
                      <h6 class="card-title">Bid Amount: {value.bid_amount} BD</h6>
                    </div>
                  </>
                );
              })
              : ""}
          </div>
        </div>
      </div>
      {Singleprop?.bid_user_details.length === 0 ? null : (
        <div class="col d-flex flex-row-reverse gap-2 pt-2">{
          bidderSelected ?
            <Button_Component
              className={"btn "}
              text={"check Transaction"}
              style={{ background: Btnbgchange, border: 'none' }}
              onClick={() => Navigate('/transaction', {
                state: {
                  id: Singleprop._id
                }
              })}
            /> :
            <Button_Component
              style={{ background: Btnbgchange, border: 'none' }}
              className={"btn "}
              text={"Approve"}
              onClick={() => CreateTransaction()}
            />
        }
        </div>
      )}
    </>
  )
}

export default RequestList;
