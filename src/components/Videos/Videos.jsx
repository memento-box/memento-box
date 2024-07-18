import axios from "axios";
import { useState, useEffect, React } from "react";
import ReactPlayer from 'react-player';



const Videos = () => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; //VITE needed for import
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const [fileUpload, setFileUpload] = useState([]);
    const [fileMap, setFileMap] = useState([])

    const videoUpload = async (e) => { //Uploads video to cloudinary and returns media url
      
      const uploadCloud = e.target.files[0];

      const formData = new FormData();
      formData.append('file', uploadCloud);
      formData.append('upload_preset', uploadPreset);
      let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`; //appending cloud names & presets to url

      axios.post(apiUrl, formData)
      .then((r) => {  //creating an array for the video urls
        console.log(r.data);
        const videoData = r.data
        setFileMap([...fileMap, videoData])
      })
      .catch((e) => {
        console.log("Something went wrong with your video upload", e)
      })

    }

    const serverUpload =(video) => {
        console.log(video);
    }

    const deleteVideo = (video) => { //TERNERARY OPERATOR FOR DELETE TOKEN IF IT EXISTS
        
        const formData = new FormData();
        formData.append('token', video.delete_token)
        let destroyUrl = `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token` //deletes using upload token within 10 min
       
        axios.post(destroyUrl, formData)
         .then((r) => {  
          console.log('Success', r)
  
        })
          .catch((e) => {
          console.log("Something went wrong with deleting your video", e)
        })

    }

    useEffect(() => {
      
    }, []);


    return (
        <div id="container">
           Video Upload: 

        {/*Form to upload videos to Cloudinary*/}
        <form>
            <input type='file' accept='video/*' onChange={videoUpload}/>
            <button type='submit'>Upload Video</button>
        </form>

        {/*Temporary mapping until video urls connect to databse*/}
        {
            fileMap.length > 0 ? (
                fileMap.map((file) => {
                    return <>
                    <ReactPlayer url={file.url} controls />
                    <button onClick={() => deleteVideo(file)}>Delete Video</button>
                    <button onClick={() => serverUpload(file)}>Add Video To Box</button>
                    </>
                })
            ) : (<p>No Videos To Display</p>)
        }
        

        

        </div>
    )

}

export default Videos;