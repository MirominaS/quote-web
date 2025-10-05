import React from 'react'
import './DownloadImage.css'
import { MdCloudDownload } from "react-icons/md";
import html2canvas from 'html2canvas';

const DownloadImage = ({printRef}) => {

    const handleDownloadImage = async () => {
    const canvas = await html2canvas(printRef.current,{allowTaint:true});
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = "image.png";
    link.click();
    };


  return (
    <div className='download-image-container' onClick={handleDownloadImage}>
        <MdCloudDownload />
    </div>
  )
}

export default DownloadImage