import { useState } from "react";
import axios from "axios";

const Letters = () => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; //VITE needed for import
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const [fileUpload, setFileUpload] = useState([]);
    const [textUpload, setTextUpload] = useState([]);
    const [fileMap, setFileMap] = useState([]);

    const [displaySwitch, setDisplaySwitch] = useState(false);


    const uploadFile = () => {
        console.log(fileUpload);

       setDisplaySwitch(true);

        const formData = new FormData();
        formData.append('file', fileUpload);
        formData.append('upload_preset', uploadPreset);
        let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`; //appending cloud names & presets to url

        axios.post(apiUrl, formData)
        .then((r) => { 
          console.log(r.data.url);
          setFileMap([r.data.url])
        })
         .catch((e) => {
         console.log("Something went wrong with your letter upload", e)
        })

    };

    const uploadText =() => {
        console.log(textUpload)

        setDisplaySwitch(false);
        setFileMap(textUpload);
    }

    return (
        <div>
        <p>Either upload or craft a personalized letter to add to the box!</p>

        <form onSubmit={uploadFile}>
           <input type='file' accept='image/*' onChange={(e) => setFileUpload(e.target.files[0])}/> 
           <button type='submit'>Upload</button>
           </form>

        <form onSubmit={uploadText}>
           <input type='text' style={{height:'150px', width: '400px'}} onChange={(e) => setTextUpload(e.target.value)} />
           <button type='submit'>Submit</button>
        </form>

        { displaySwitch == true ? 
            (
            fileMap.map((file) => ( 
            <img src={file} style={{height: '480px', width: '720px'}} /> )) 
            ) 
            : (  <div>{fileMap}</div> )
        }

        </div>
    )

}

export default Letters;