import { Button } from "@mui/material";
import axios from "axios";

export default function UploadButton({reload, uploadFileType, endpoint}) {
    const box_id = 1; // NEED TO PULL THIS FROM REDUX< USING 1 FOR TESTING

    const getSignedUrl = async () => { // Retrieving variables from server
        const response = await axios.get('/api/upload/signed-url');
        return response;
    }

    const beginUpload = async (file) => {
        const serverResponse = await getSignedUrl();
        const {api_key, cloud_name, signature, timestamp, upload_preset} = serverResponse.data;

        const formData = new FormData(); // Appending formData to file for upload
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

            const payload = {
              box_id:box_id,
              secure_url:secure_url,
              public_id:public_id
            }

            endpoint(payload);
        } catch(err) {
            console.log(err);
        }
    }

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if(file) {
            console.log('name:',file.name);
            const response = await beginUpload(file);
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
