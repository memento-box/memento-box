import { Button } from "@mui/material";
import axios from "axios";

export default function UploadButton() {
    const getSignedUrl = async () => {
        const response = await axios.get('/api/upload/signed-url');
        return response;
    }

    const beginUpload = async (file) => {
        const serverResponse = await getSignedUrl();
        const {api_key, cloud_name, signature, timestamp, upload_preset} = serverResponse.data;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', upload_preset);

        try {
            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
                formData,
                {
                    headers: { 'Content-Type' : 'multipart/form-data' }
                }
            );

            const cloudinaryFileUrl = uploadResponse.data.secure_url;
            console.log('upload success:', cloudinaryFileUrl);

            return cloudinaryFileUrl;
        } catch(err) {
            console.log(err);
        }
    }

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if(file) {
            console.log('name:',file.name);
            let response = await beginUpload(file);
            // going to send url to database
        }
    }
  return (
    <div>
      <input
        accept="audio/*"
        style={{ display: "none" }}
        id="upload-button-file"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="upload-button-file">
        <Button variant="contained" color="error" component="span"
        sx={{borderRadius:"50px"}}>
            + Upload
        </Button>
      </label>
    </div>
  );
}
