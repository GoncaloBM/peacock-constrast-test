import React, {useState} from "react";
import useEventListener from "../virtual-keyboard/use-event-listener";

const FileUpload = () => {

    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState( {})
 
    const handeChange = (e) => {
        setFile(e.target.files[0])
    }
    const handlePost = (e) => {
        e.preventDefault();
        const formData = new FormData();
        //console.log(file);
        
        formData.append('file', file)
        let options = {
            method: "POST",
            body: formData,
            headers:{'Content-Type': 'Banana'}

        }
        delete options.headers['Content-Type'];

        fetch('http://localhost:5001/upload', options).then(result =>{  
                 /* const {fileName, filePath} = result.data;
                 setUploadedFile({fileName, filePath}) */
                 console.log(result)
             }
             
             )
    }
    return(
        <div>
            <form onSubmit={handlePost}>
                <div>
                <input onChange={handeChange}  type='file' id='customFile' placeholder='' />
                
                </div>
            
            
            <input type='submit' value='Upload' />
            </form>
        </div>
    )
}

export default FileUpload