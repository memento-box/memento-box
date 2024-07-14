import axios from "axios";
import { useState } from "react";

const Videos = () => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;


    const [fileUpload, setFileUpload] = useState([]);



    const videoUpload = () => {
      console.log(fileUpload);

      const formData = new FormData();
      formData.append('file', fileUpload);
      formData.append('upload_preset', uploadPreset);
      let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

      axios.post(apiUrl, formData)
      .then((r) => {
        console.log(r.data.url);
      })
      .catch((e) => {
        console.log("Something went wrong with your video upload", e)
      })

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