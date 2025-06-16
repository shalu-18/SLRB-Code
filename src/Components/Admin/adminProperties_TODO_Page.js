import React, { useEffect, useState } from 'react'
import download_logo from "../Assets/Images/downloadbtn.png"
import { adminTodo, AddPropertyToLedger } from "../../Services/AdminServices/Admin_Services";
import { useNavigate } from 'react-router-dom';
import Button_Component from "../CommonComponents/Button";
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom } from "../CommonComponents/LandingPage";

const AdminProperties_TODO_Page = () => {
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  const [AdminTodo, setAdminTodo] = useState([])
  const Navigate = useNavigate();

  const GetAdminTodo = () => {
    adminTodo().then((res) => {
      console.log("admin todo data", res)
      setAdminTodo(res.data.property)
      console.log("admin todo data", res.data.property);
    });
  };

  useEffect(() => {
    GetAdminTodo();
  }, []);

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const checkProperty = (data) => {
    console.log("data", data._id);
    Navigate('/guestproperty', {
      state: {
        id: data._id
      }
    })
  }

  const AddProperty = (data) => {
    console.log("data", data);
    AddPropertyToLedger(data._id).then((res) => {
      toast.success("Property Added to the ledger Successfully.")
      GetAdminTodo()
    })
  }

  return (
    <>
      < div class="row gy-2 my-2" >
        {
          AdminTodo.map((data) => {
            console.log(data)
            return (
              <div class="col-md-6 col-md-4 col-lg-3 mb-2">
                <div style={{ position: "relative", width: "auto" }}>
                  <p class="my-card-title">{data?.property_type} in {data?.city}</p>
                  <h6 class="my-card-text">{data?.property_name}</h6>
                  <img src={`data:image/png;base64,${_arrayBufferToBase64(data?.images[0]?.data)}`} className='card-img img-fluid' style={{ height: "13rem", width: "80rem", position: "relative" }} />
                <a class="btn " style={{ position: "absolute", right: 0, bottom: 0, background:Btnbgchange }}><img src={download_logo} onClick={() => checkProperty(data)}
                /></a>
                </div>
                {
                  data?.SLRB_Verfication == "Verified" ?
                    <Button_Component
                      className={"btn  btn-sm mt-1 float-end"}
                      text={"Check Transaction"}
                      style={{ background: Btnbgchange, border: 'none' }}
                      onClick={() => {
                        Navigate('/transaction', {
                          state: {
                            id: data._id
                          }
                        })
                      }}
                    /> :
                    <Button_Component
                      className={"btn  btn-sm mt-1 float-end"}
                      style={{ background: Btnbgchange, border: 'none' }}
                      text={"Add Property to ledger"}
                      onClick={() => AddProperty(data)}
                    />
                }
              </div>
            )
          })
        }
      </div >
    </>
  )
}

export default AdminProperties_TODO_Page