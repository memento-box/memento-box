import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton.jsx";
import axios from "axios";
import "./Photos.css";

export default function Photos() {
  const [images, setImages] = useState([]); // State for images to be rendered


  const uploadFileType = "image/*";

  const fetchImages = () => {
    // API call to retrieve relevant images
    axios.get('/api/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  };


  useEffect(() => {
    // Fetch images on component load
    fetchImages();
  }, []);

  return (
    <div className="box-edit-container">
      <EditingSidebar />
      <Typography variant="h4" sx={{ marginLeft: "30px", marginTop: "80px" }}>
        Image Uploads
      </Typography>
      <div className="images-actions">
        <ImageUploadButton uploadFileType={uploadFileType} reload={fetchImages} />
       
      </div>
      <Divider />
      <div className="images-display">
        {images.length === 0 ? (
          <Typography sx={{ margin:"auto", marginTop:"10px"}}> Added images </Typography>
        ) : (
          images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.media_url} alt={image.fileName} className="image-preview" />
              
              <Typography>{image.fileName}</Typography> 
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}











// export default function UploadImage() {

//   const [loading , setLoading] = useState(false)
//   const [url, setUrl] = useState('')

//   const uploadImage = async (event) => {
//     const file = event.target.files[0];
//     const base64 = await convertBase64(file);
//     setLoading(true);
//     axios
//     .post("http://localhost:5000/uploadImage", { image, base64 })
//     .then((res) => {
//       setUrl(res.data);
//       alert("Image uploaded successfully");
//     })
//     .then(() => setLoading(false))
//     .catch(console.log);
//   };

//   return (
//     <div>UploadImage</div>
//   )
// }

// import React from "react";
// import { useState } from "react";
// import { Typography } from "@mui/material";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
// import  CloudinaryUploadWidget from "../CloudinaryUploadWidget/CloudinaryUploadWidget.jsx";
// // import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";

// // import "./Photos.css";

//  function Photos() {
//   const [publicId, setPublicId] = useState("");
//   // Replace with your own cloud name
//   const [cloudName] = useState("ddwxzpezz");
//   // Replace with your own upload preset
//   const [uploadPreset] = useState("MEMENTO_BOX_ERIK_SILCOX");

//   // Upload Widget Configuration
//   // Remove the comments from the code below to add
//   // additional functionality.
//   // Note that these are only a few examples, to see
//   // the full list of possible parameters that you
//   // can add see:
//   //   https://cloudinary.com/documentation/upload_widget_reference

//   const [uwConfig] = useState({
//     cloudName,
//     uploadPreset
//     // cropping: true, //add a cropping step
//     // showAdvancedOptions: true,  //add advanced options (public_id and tag)
//     // sources: [ "local", "url"], // restrict the upload sources to URL and local files
//     // multiple: false,  //restrict upload to a single file
//     // folder: "user_images", //upload files to the specified folder
//     // tags: ["users", "profile"], //add the given tags to the uploaded files
//     // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
//     // clientAllowedFormats: ["images"], //restrict uploading to image files only
//     // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
//     // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
//     // theme: "purple", //change to a purple theme
//   });

//   // Create a Cloudinary instance and set your cloud name.
//   const cld = new Cloudinary({
//     cloud: {
//       cloudName
//     }
//   });

//   const myImage = cld.image(publicId);

//   return (
//     <div className="App">
//       {/* <EditingSidebar /> */}
//       <Typography variant="h4" sx={{ marginLeft: "30px", marginTop: "80px" }}>
//       Cloudinary Upload Widget
//       </Typography>
     
//       <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
//       <p>
//         <a
//           href="https://cloudinary.com/documentation/upload_widget"
//           target="_blank"
//         >
//           Upload Widget User Guide
//         </a>
//       </p>
//       <p>
//         <a
//           href="https://cloudinary.com/documentation/upload_widget_reference"
//           target="_blank"
//         >
//           Upload Widget Reference
//         </a>
//       </p>
//       <div style={{ width: "800px" }}>
//         <AdvancedImage
//           style={{ maxWidth: "100%" }}
//           cldImg={myImage}
//           plugins={[responsive(), placeholder()]}
//         />
//       </div>
//     </div>
//   );
// }

// export default Photos;






















