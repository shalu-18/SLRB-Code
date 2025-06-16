import "../../Assets/Styles/Cards.css";
import "../../Assets/Styles/Dropdown.css";
import { useEffect, useState } from "react";
import { transferProperties } from "../../../Services/AdminServices/Admin_Services"
import { toast } from 'react-toastify';
import Button_Component from "../../CommonComponents/Button";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons';
import ShowText from "./showText"
import { Modal } from 'antd';
import { useAtom } from 'jotai';
import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "../../CommonComponents/LandingPage"

const Transfer_Form = (props) => {
  const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
  let notarydocument = props.txDetail?.notarization_details.notarization_details_smart_contract_document.data
  const [fileName, setFileName] = useState()
  const [fileBuffer, setFileBuffer] = useState()
  const [uploadfile, setUploadfile] = useState()
  const [Notarizationdoc, setNotarizationdoc] = useState(notarydocument)
  const [notaryFileData, setNotaryFileData] = useState()
  const Navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
    })
  }

  const captureFile = (event) => {
    event.preventDefault();
    let file = event.target.files[0];

    setFileName(file.name)
    setFileBuffer(file)
    setUploadfile(file)
  }

  const TransferProperty = async (e) => {
    e.preventDefault()
    let filebuf = await getBase64(fileBuffer)
    // console.log("notarydata", props.txDetail.property_id, { documentHash: filebuf })
    transferProperties(props.txDetail.property_id, { newOwnerID: props.txDetail.buyerId }).then((res) => {
      toast.success("Property Transfered Successfully.")
      Navigate('/adminproperty')
    })
  }

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const fetchFileData = () => {
    const linkSource = `data:application/pdf;base64,${_arrayBufferToBase64(props.txDetail?.notarization_details.notarization_details_upload_documents.data)}`;
    //  console.log("linkSource", linkSource)
    setNotaryFileData(linkSource)
  }

  const GetNotaryDocument = () => {
    console.log("notarydocument", notarydocument)
    // {
    //   Notarizationdoc.map((data)=>{
    //     console.log("notarydocument", data.name)
    //     return(
    //       <h1>{data}</h1>
    //     )
    //  })
    // }
  }
  useEffect(() => {
    fetchFileData()
    GetNotaryDocument()
    console.log("file", Notarizationdoc);
  }, [props])

  return (
    <>
      <div class="container" style={props?.txDetail?.current_status != 'titleTransfer' && props?.txDetail?.title_transfer?.title_transfer_status == 'pending' ? { pointerEvents: "none", opacity: "0.4" } : {}}>
        <div class="row">
          <div class="col">
            <label class="labelstyle">


            </label>
            {notaryFileData ?
              <div className="col-md-6 d-flex justify-content-between align-items-center">
                <a> <EyeOutlined style={{ color: 'blue' }} onClick={showModal} /></a>
                <a download={notaryFileData} href={notaryFileData} title='Download pdf document'><DownloadOutlined style={{ color: 'green' }} /></a>
              </div> : ""}
          </div>
          <div class="col">
            <label class="labelstyle">Upload Documents</label>
            <div class="row">
              <div class="row">
                <div class="col"> <div class="upload-btn-wrapper">
                  <button class="btn1">Upload</button>
                  <input type="file" name="myfile" onChange={(event) => {
                    captureFile(event);
                  }} />
                </div></div>
                <div class="col"><h6 class="my-card-text pt-1">{fileName}</h6></div>
              </div>
            </div>

            <div class="p-2">
              <Button_Component
                className={"btn btn-sm"}
                text={"Transfer Property"}
                onClick={TransferProperty}
                style={
                  uploadfile ? {
                    background: Btnbgchange,
                    color: "white",
                    border: "none",
                  } : {
                    backgroundColor: "gray",
                    color: "white",
                    border: 'none',
                    cursor: "not-allowed"
                  }
                }
              />
            </div>
          </div>
        </div>


      </div>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={1200} >
        <ShowText notaryFileData={notaryFileData} />
      </Modal>
    </>
  );
};

export default Transfer_Form;