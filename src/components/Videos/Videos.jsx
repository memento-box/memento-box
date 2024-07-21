import axios from "axios";
import { useState, useEffect, React } from "react";
import ReactPlayer from 'react-player';
import EditingSidebar from "../EditingSidebar/EditingSidebar";



const Videos = () => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; //VITE needed for import
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const [fileUpload, setFileUpload] = useState([]);
    const [fileMap, setFileMap] = useState([]);
    const [indexdisplay, setIndexdisplay] = useState([]);
    const [textUpload, setTextUpload] = useState([]);
    

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

    const descriptionUpload = (file) => {
      const uploadObject = {'upload': textUpload};

      axios.put(`api/upload/video/${file.id}`, uploadObject).then((r) => {
        console.log('Success');
      }).catch((e) => {
        console.log('Error in client-side PUT request', e);
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
      videoGet();
    }, []);


    return (
        <div id="container">
         {/* <EditingSidebar /> */}
           Video Upload: 

        {/*Form to upload videos to Cloudinary*/}
        <form onSubmit={videoUpload}>
            <input type='file' accept='video/*' onChange={(e) => setFileUpload(e.target.files[0])}/>
            <button type='submit'>Add Video To Box</button>
        </form>

        {/*Temporary mapping until video urls connect to databse*/}
        {
            fileMap.length > 0 ? (
                fileMap.map((file, index) => {
                    return <>
                    <ReactPlayer url={file.media_url} controls />
                    <button onClick={() => deleteVideo(file)}>Remove From Box</button>
                    <button onClick={() => setIndexdisplay(index)}>Add Description</button>
                    
                     
                     { indexdisplay === index ?  (
                     <form onSubmit={() => descriptionUpload(file)}>
                      <input type='text' value={textUpload} onChange={(e) => setTextUpload(e.target.value)}/>
                      <button type='submit'>Upload Description</button>
                     </form>
                     ) : ('') }

                    </>
                })
            ) : (<p>No Videos To Display</p>)
        }
        

        

        </div>
    )

}
/*
{index = indexdisplay ? 
  (
  <form>
    <input type='text' />
    <button>Add Description To Box</button>
  </form>
  ) : ''}

*/

export default Videos;