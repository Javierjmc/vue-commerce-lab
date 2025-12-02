import React from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from '@cloudinary/react';

interface VideoBannerProps {
  publicId: string;
  title?: string;
  description?: string; 
  callToActionText?: string; 
  callToActionLink?: string; 
}

const VideoBanner: React.FC<VideoBannerProps> = ({
  publicId,
  // Ya no se usan title, description, callToActionText, callToActionLink directamente en el renderizado
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dax2r7ro2', 
    },
  });
  console.log("Cloudinary Cloud Name:", "dax2r7ro2"); 
  console.log("Video Public ID:", publicId);

  const video = cld.video(publicId);

  return (
    <div className="relative w-full h-[600px] md:h-[500px] overflow-hidden flex items-center justify-center">
      <AdvancedVideo
        cldVid={video}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div> 
  
    </div>
  );
};

export default VideoBanner;
