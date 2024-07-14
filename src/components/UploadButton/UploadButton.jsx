import { Button } from "@mui/material";
import axios from "axios";

export default function UploadButton({reload, uploadFileType}) {
    const getSignedUrl = async () => {
        const response = await axios.get('/api/upload/signed-url');
        return response;
    }

    const beginUpload = async (file) => {
        const serverResponse = await getSignedUrl();
        const {api_key, cloud_name, signature, timestamp, upload_preset} = serverResponse.data;

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

            const {public_id, secure_url} = uploadResponse.data;
            console.log('upload success:', 'public_id - ',public_id,'secure_url - ',secure_url);

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
            // id and url ready to be sent to db (still need to implement box id)
            // afterwards reload voice list
        }
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
        <Button variant="contained" component="span"
        sx={{borderRadius:"50px", backgroundColor:"black"}}>
            + Upload
        </Button>
      </label>
    </div>
  );
}
