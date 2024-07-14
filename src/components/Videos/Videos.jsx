import axios from "axios";
import { useState } from "react";

const Videos = () => {

    const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME;
    const upPreset = import.meta.env.UPLOAD_PRESET;

    const [fileUpload, setFileUpload] = useState([]);



    const videoUpload = () => {
        console.log(fileUpload);

    }

    return (
        <div id="container">
           Video Upload: 

        <form onSubmit={videoUpload}>
            <input type='file' accept='video/*' onChange={(e) => setFileUpload(e.target.files[0])}/>
            <button type='submit'>Upload Video</button>
        </form>

        </div>
    )

}

export default Videos;