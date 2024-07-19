import { createContext, useEffect, useState } from 'react';

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
  const [loaded, setLoaded] = useState(false);

  

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            setPublicId(result.info.public_id);
          }
        }
      );

      document.getElementById('upload_widget').addEventListener(
        'click',
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };





















// import { useEffect, useRef } from 'react';

// export const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
//   const cloudinaryRef = useRef();
//   const widgetRef = useRef();

//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       uwConfig,
//       (error, result) => {
//         if (!error && result && result.event === "success") {
//           console.log("Upload Success: ", result.info);
//           setPublicId(result.info.public_id);
//         }
//       }
//     );
//   }, [uwConfig, setPublicId]);

//   return (
//     <button onClick={() => widgetRef.current.open()}>Upload</button>
//   );
// };

























// var cloudinary =require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: cloud_name,
//   api_key: api_key,
//   api_secret: api_secret,
// });

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };



// module.exports = (image) => { //image = > base64
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if(result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };


// // const uploadImage = require("./uploadImage.js");

// app.post("/uploadImage", (req, res) => {
//   uploadImage(req.body.image)
//   .then((url) => res.send(url))
//   .catch((error) => res.status(500).send(error));
// });