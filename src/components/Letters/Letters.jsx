import { useState } from "react";

const Letters = () => {

    const [fileUpload, setFileUpload] = useState([]);
    const [fileMap, setFileMap] = useState([]);

    const uploadText = () => {
        console.log(fileUpload);
        return <>
        </>
    }

    return (
        <>
        Either upload or craft a personalized letter to add to the box!

        <form onSubmit={uploadText}>
           <input type='file' accept='image/*' onChange={(e) => setFileUpload(e.target.files[0])}/> 
           <button type='submit'>Upload</button>
           </form>

        <form onSubmit={uploadText}>
           <input type='text' style={{height:'150px', width: '400px'}} onChange={(e) => setFileUpload(e.target.value)} />
           <button type='submit'>Submit</button>
        </form>
        </>
    )

}

export default Letters;