import axios from "axios";
import { useState, useEffect, React } from "react";
import ReactPlayer from 'react-player';
import EditingSidebar from "../EditingSidebar/EditingSidebar";



const Videos = () => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; //VITE needed for import
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const [fileUpload, setFileUpload] = useState([]);
    const [fileMap, setFileMap] = useState([])
    const [deleteTok, setDeleteTok] = useState([])

    const videoGet = () => {
        axios.get('/api/upload/video').then((r) => {
          console.log(r)
          setFileMap(r.data);
        }).catch((e) => {
          console.log('Error in client-side Video GET request', e);
        })
    }

    const videoUpload = async (e) => { //Uploads video to cloudinary and returns media url
      
      const formData = new FormData();
      formData.append('file', fileUpload);
      formData.append('upload_preset', uploadPreset);
      let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`; //appending cloud names & presets to url

      axios.post(apiUrl, formData)
      .then((r) => {  //uses hook to set media url for mapping on Videos page
        console.log(r.data);
        
        serverUpload(r.data)
        
      })
      .catch((e) => {
        console.log("Something went wrong with your video upload", e)
      })

    }

    const serverUpload =(videoData) => { //uploads video & description to box 

        axios.post('/api/upload/video', videoData).then((r) => {
          console.log('success', r);
          videoGet();
        }).catch((e) => {
          console.log('Error in uploading videos to server', e);
        })
    }

    const deleteVideo = (file) => {
      axios.delete(`api/upload/video/${file.id}`).then((r) => {
        videoGet();
      }).catch((e) => {
        console.log("Error in client-side DELETE request", e);
      })
    }

    // New Data Flow removes the ability to upload delete_token via this method, code left for reference
    /*
    const deleteVideo = (video) => { 
        
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
        */



    useEffect(() => {
      
    }, []);


    return (
        <div id="container">
         {/* <EditingSidebar /> */}
           Video Upload: 

        {/*Form to upload videos to Cloudinary*/}
        <form onSubmit={videoUpload}>
            <input type='file' accept='video/*' onChange={(e) => setFileUpload(e.target.files[0])}/>
            <button type='submit'>Upload Video</button>
        </form>

        {/*Temporary mapping until video urls connect to databse*/}
        {
            fileMap.length > 0 ? (
                fileMap.map((file) => {
                    return <>
                    <ReactPlayer url={file.media_url} controls />
                    <button onClick={() => deleteVideo(file)}>Delete Video</button>
                    </>
                })
            ) : (<p>No Videos To Display</p>)
        }
        

        

        </div>
    )

}



export default Videos;