import { Button } from "@mui/material";
import axios from "axios";
import { useState } from 'react';


export default function UploadButton({reload, uploadFileType}) {
  const [imageUrl, setImageUrl] = useState(false);
  const [publicId, setPublicId] = useState(false)


    const getSignedUrl = async () => {
        const response = await axios.get('/api/upload/signed-url');
        return response;
    };


    const beginUpload = async (file) => {

        const serverResponse = await getSignedUrl();
        console.log(serverResponse.data)

        const {api_key, cloud_name, signature, timestamp, upload_preset} = serverResponse.data;
        console.log('timestamp', timestamp)
        console.log('signature', signature)
        console.log('cloud_name', cloud_name)
        console.log('api_key', api_key)
        console.log('upload_preset', upload_preset)


        const formData = new FormData();
        formData.append('file', file);
        formData.append('timestamp',timestamp);
        formData.append('api_key', api_key);
        formData.append('signature', signature);
        formData.append('upload_preset', upload_preset);


        try {
          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
            formData,
            {
              headers: { 'Content-Type' : 'multipart/form-data' }
            }
          );
          console.log('upload success:', uploadResponse.data);
          return uploadResponse.data;
        } catch(err) {
          console.log(err);
        }
    }
    const handleUpload = async (event) => {
      const file = event.target.files[0];
      if(file) {
        console.log('name:',file.name);
        const response = await beginUpload(file);
        const {public_id, secure_url} = response;
        console.log(public_id)
        console.log(secure_url);
        setImageUrl(secure_url)
        setPublicId(public_id)
        sendPhotoToServer(secure_url, public_id);
        // id and url ready to be sent to db (still need to implement box id)
      }
    }

    const sendPhotoToServer = (event) => {
      event.preventDefault();
      axios
      .post('/api/upload/image', { path: secure_url, public_id })
      .then((response) => {
        fetchImages();
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong!')
      });
    }


  return (
    <div>
      <input
        accept={uploadFileType}
        style={{ display: "none" }}
        id="upload-button-file"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="upload-button-file">
        <Button  variant="contained" component="span"
        sx={{borderRadius:"50px", backgroundColor:"black"}}>
            + Upload
        </Button>
      </label>
      <br/>
      <br/>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt={publicId}/>
        ) : (
          <p>No image yet</p>
        )}
      </div>
    </div>
  );
}