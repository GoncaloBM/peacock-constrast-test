import React, { useState, useEffect, useRef } from "react";
import "./fileupload.css";

const FileUpload = () => {
  const dropRef = useRef(null);
  const avoidDropRef = useRef(null)
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false)

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

  const handeChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handlePost = (e) => {
    e.preventDefault();
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
          console.log('Sucesso')
          setUploading(false)
          setUploaded(true)
        }
      console.log(result);
    });
  };
  return (
    <div ref={avoidDropRef} className="upload-body">
      <form className="formCentered" onSubmit={handlePost}>
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
                  <input className="upload" type="submit" value="Upload" />

        </div>

      </form>
      <div
        ref={dropRef}
        className="drop-box"
      >
          {uploading?<div className='loader'></div>:''}
          {uploaded ?<div className='success'></div>:''}
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
    </div>
  );
};

export default FileUpload;
