import axios from "axios";
import { useState, useEffect, React } from "react";
import ReactPlayer from 'react-player';
import EditingSidebar from "../EditingSidebar/EditingSidebar";

//--------------MUI Imports-------------------//
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography, Divider } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';



const Videos = () => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; //VITE needed for import
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;


    //HOOKS
    const [fileUpload, setFileUpload] = useState([]);
    const [fileMap, setFileMap] = useState([]);
    const [indexdisplay, setIndexdisplay] = useState([]);
    const [textUpload, setTextUpload] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    //GET VIDEOS FROM DATABASE
    const videoGet = () => {
        axios.get('/api/upload/video').then((r) => {
          console.log(r)
          setFileMap(r.data); 
          setIsLoading(false);
        }).catch((e) => {
          console.log('Error in client-side Video GET request', e);
        })
    }

    //UPLOAD VIDEOS TO CLOUDINARY
    const videoUpload = async (e) => { //Uploads video to cloudinary and returns media url
      
      setIsLoading(true);

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

    //UPLOAD VIDEOS TO SERVER FROM CLOUDINARY
    const serverUpload =(videoData) => { //uploads video & description to box 

        axios.post('/api/upload/video', videoData).then((r) => {
          console.log('success', r);
          videoGet();
        }).catch((e) => {
          console.log('Error in uploading videos to server', e);
        })
    }

    //UPLOAD DESCRIPTION TO VIDEO IN DATABASE
    const descriptionUpload = (file) => {
      const uploadObject = {'upload': textUpload};

      axios.put(`api/upload/video/${file.id}`, uploadObject).then((r) => {
        console.log('Success');
        setIndexdisplay(null)
      }).catch((e) => {
        console.log('Error in client-side PUT request', e);
      })
    }

    //DETELE VIDEO FROM DATABASE
    const deleteVideo = (file) => {
      axios.delete(`api/upload/video/${file.id}`).then((r) => {
        videoGet();
      }).catch((e) => {
        console.log("Error in client-side DELETE request", e);
      })
    }

    /* NOTE: Cloudinary only allows deleting video from media library with EITHER: signed uploads or a delete_token 
    (valid for 10 minutes). Current Delete route only removes from the databse, not Cloudinary
    */

    //ON RELOAD
    useEffect(() => {
      videoGet();
    }, []);


    return (
        <div id="container">
         <EditingSidebar />
         <div style={{textAlign: "center"}}>
         <Typography variant="h4" sx={{ marginLeft: "30px", marginTop: "40px", marginBottom: "40px" }}>
        Videos
      </Typography>

        {/*Form to upload videos to Cloudinary*/}
        <form onSubmit={videoUpload}>
            <input type='file' accept='video/*' onChange={(e) => setFileUpload(e.target.files[0])}/>
            { isLoading ?
            <LoadingButton loading variant="outlined" sx={{borderRadius:"50px", backgroundColor:"grey", marginBottom: "10px"}}>Add Video To Box</LoadingButton>
            :
            <Button type='submit' sx={{borderRadius:"50px",color: "white", backgroundColor:"black", marginBottom: "10px"}} startIcon={<CloudUploadIcon />}>Add Video To Box</Button>
            }
        </form>

        <Divider />
        {
            fileMap.length > 0 ? (
                fileMap.map((file, index) => {
                    return  <div key={file.id}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <ReactPlayer url={file.media_url} controls />
                    </div>
                    <Button variant="outlined" size="small" sx={{margin:"10px"}} startIcon={<DeleteIcon />} onClick={() => deleteVideo(file)}>Remove From Box</Button>
                    <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => setIndexdisplay(index)}>Add Description</Button>
                    
                     
                     { indexdisplay === index ?  (
                     <form onSubmit={() => descriptionUpload(file)}>
                      <input type='text' style={{width: "400px", height: "75px"}}value={textUpload} onChange={(e) => setTextUpload(e.target.value)}/>
                      <button type='submit'>Upload Description</button>
                     </form>
                     ) : ('') }

                    </div>
                })
            ) : ("")
        }

        
        </div>
        </div>
    )

}

export default Videos;