import React, { useState, useEffect, useRef } from "react";
import "./fileupload.css";

const FileUpload = () => {
  const dropRef = useRef(null);
  const avoidDropRef = useRef(null)
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    let dragCounter = 0;
    let handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    let handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;

      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragging(true);
      }
    };
    let handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (dragCounter > 0) return;
      setDragging(false);
    };
    let handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          console.log(e.dataTransfer.files)
        setFile(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
        dragCounter = 0;
      }
    };

    let preventDrop = (e) => {
        e.preventDefault();
      e.stopPropagation();
      setDragging(false);

    }

    let div = dropRef.current;
    let avoidDropDiv = avoidDropRef.current;
    avoidDropDiv.addEventListener("drop", preventDrop)
    avoidDropDiv.addEventListener("dragover", preventDrop)

    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return () => {
        avoidDropDiv.addEventListener("drop", preventDrop)
        avoidDropDiv.addEventListener("dragover", preventDrop)

      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, [dragging ,file]);


  const resetComponent = () => {
    setFile(false)
    setError(false)
    setUploaded(false)
  }


  const handeChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handlePost = (e) => {
    e.preventDefault();
    if(!file){return}

    setUploading(true)

    const formData = new FormData();
    //console.log(file);
    console.log('file',file)
    formData.append("file", file);
    let options = {
      method: "POST",
      body: formData,
      headers: {},
    };
    /*         delete options.headers['Content-Type'];
     */ console.log(window.location);
    fetch(`${process.env.REACT_APP_API_URL}upload`, options).then((result) => {
      if(result.status === 200){
          setUploading(false)
          setUploaded(true)
        }else{
          setUploading(false)
          setError(true)
        }
      console.log(result.status, result.statusText );
    }).catch(err=> {
        console.log(err)
        setUploading(false)

        setError(true)
    }
      );
  };
  return (
    <>
    <div ref={avoidDropRef} className="upload-body">
    <div className="logospace-upload">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="sk-logo-upload"
                    viewBox="0 0 878 272"
                    aria-hidden="true"
                  >
                    <path
                      d="M868.418 251.951c-7.95 4.076-17.698.936-21.774-7.014-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.014 4.076 7.95.935 17.699-7.014 21.774z"
                      fill="#05AC3F"
                    ></path>
                    <path
                      d="M868.418 208.505c-7.95 4.076-17.698.935-21.774-7.014-4.076-7.95-.936-17.699 7.013-21.775 7.95-4.075 17.7-.935 21.775 7.014 4.076 7.95.935 17.699-7.014 21.775z"
                      fill="#069DE0"
                    ></path>
                    <path
                      d="M868.417 164.467c-7.95 4.076-17.697.935-21.773-7.015-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.014 4.076 7.95.935 17.699-7.015 21.775z"
                      fill="#6E55DC"
                    ></path>
                    <path
                      d="M868.418 119.206c-7.95 4.076-17.698.935-21.774-7.015-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.935 21.775 7.014 4.076 7.95.935 17.699-7.014 21.775z"
                      fill="#EF1541"
                    ></path>
                    <path
                      d="M868.418 75.398c-7.95 4.076-17.698.935-21.774-7.014-4.076-7.95-.936-17.699 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.013 4.076 7.95.935 17.7-7.014 21.775z"
                      fill="#FF7112"
                    ></path>
                    <path
                      d="M868.418 31.298c-7.95 4.075-17.698.935-21.774-7.015-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.014 4.076 7.95.935 17.699-7.014 21.775z"
                      fill="#FCCC12"
                    ></path>
                    <path
                      className=""
                      d="M56.952 84.278c-31.047 0-56.306 25.26-56.306 56.307V270.83h26.7v-72.358l9.747 10.365 39.212-15.361c22.426-8.744 36.953-28.807 36.953-52.892 0-31.047-25.259-56.307-56.306-56.307v.001zm10.02 85.509l-39.626 15.531v-44.734c0-17.909 13.445-30.92 29.606-30.92 16.16 0 29.607 13.011 29.607 30.92 0 11.319-5.525 23.692-19.587 29.202v.001zm111.358-85.51c-31.046 0-56.306 25.259-56.306 56.306 0 31.047 25.26 56.306 56.307 56.306 18.47 0 35.961-8.94 45.924-22.72l-21.42-14.829c-2.579 4.231-10.781 12.164-24.504 12.164-12.786 0-23.017-7.634-27.355-18.725h81.234a58.702 58.702 0 001.273-12.196c0-31.047-24.106-56.306-55.152-56.306h-.001zm-27.31 44.11c4.41-11.091 14.755-18.726 27.31-18.726 12.787 0 22.37 7.635 26.383 18.725H151.02v.001zm177.947-30.664c-9.055-9.41-21.022-13.446-33.652-13.446-26.123 0-52.722 23.72-52.722 56.306s26.6 56.306 52.722 56.306c12.63 0 24.597-4.036 33.652-13.446v10.159h26.7V87.565h-26.7v10.16-.002zm-29.607 73.781c-17.083 0-30.067-13.629-30.067-30.921s13.292-30.921 30.067-30.921c17.084 0 29.607 13.629 29.607 30.92 0 17.293-12.523 30.922-29.607 30.922zm122.8-61.82c11.589 0 21.075 6.277 25.974 15.714l20.846-15.989c-10.098-15.117-27.316-25.093-46.82-25.093-31.026 0-56.27 25.243-56.27 56.27 0 31.026 25.244 56.269 56.27 56.269 19.504 0 36.722-9.976 46.82-25.093l-20.846-15.989c-4.899 9.437-14.385 15.714-25.974 15.714-17.072 0-29.587-13.62-29.587-30.901 0-17.282 12.822-30.902 29.587-30.902zm106.081-25.438c-31.047 0-56.304 25.258-56.304 56.304 0 31.047 25.257 56.306 56.304 56.306s56.306-25.26 56.306-56.306c0-31.046-25.26-56.304-56.306-56.304zm.018 87.19c-17.086 0-29.61-13.63-29.61-30.924 0-17.294 12.832-30.925 29.61-30.925 17.086 0 29.61 13.631 29.61 30.925 0 17.295-12.524 30.925-29.61 30.925v-.001zm121.748-61.752c11.588 0 21.075 6.277 25.974 15.714l20.846-15.989c-10.099-15.117-27.316-25.093-46.82-25.093-31.027 0-56.27 25.243-56.27 56.27 0 31.026 25.243 56.269 56.27 56.269 19.504 0 36.721-9.976 46.82-25.093l-20.846-15.989c-4.9 9.437-14.386 15.714-25.974 15.714-17.073 0-29.587-13.62-29.587-30.901 0-17.282 12.822-30.902 29.587-30.902zm121.442 27.035h-12.011l46.45-49.156h-34.507l-37.434 40.259V29.805h-26.7v163.797h26.7V163.48l14.804-15.539 31.486 45.662h32.327l-41.115-56.883v-.001z"
                    ></path>
                  </svg>
                </div>
      
      <div
        ref={dropRef}
        className="drop-box"
      >
        {!uploading && !uploaded && !error ?  <form className="formCentered" id="myform" onSubmit={handlePost}>
        <div className="button-wrap">
          <label className="button" htmlFor="customFile">
            Choose File
          </label>
          {file ? <div>{file.name}</div> : <div>No file chosen</div>}
          <input
            className="choose-file"
            onChange={handeChange}
            type="file"
            name="customFile"
            id="customFile"
          />

        </div>

      </form> : ''}
        
          {uploading?<div className='loader'></div>:''}
          {uploaded ?
          <>
          <div className='success'></div>
          <input className='more' value='More' onClick={resetComponent}/>

          </>
          :''}



          {uploaded ?<div ></div>:''}

          {error ?
          <>
           <div className='error'></div>
           <input className='more' value='Try again' onClick={resetComponent}/>

           </>
           :''}
        {dragging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36,
              }}
            >
                
              <div>drop here :)</div>
            </div>
          </div>
        )}
      </div>
     
      <input className="upload" type="submit"  form="myform" value="Upload" />

    </div>
    </>
  );
};

export default FileUpload;
