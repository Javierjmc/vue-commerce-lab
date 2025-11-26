import React, { useState } from 'react';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  magnifierHeight = 200,
  magnifierWidth = 200,
  zoomLevel = 1.5,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setImgWidth(width);
    setImgHeight(height);

    const x = e.pageX - left;
    const y = e.pageY - top;

    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      style={{ cursor: 'none' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        onMouseMove={handleMouseMove}
      />

      {showMagnifier && (
        <div
          className="absolute border border-gray-300 pointer-events-none"
          style={{
            height: magnifierHeight,
            width: magnifierWidth,
            top: mousePosition.y - magnifierHeight / 2,
            left: mousePosition.x - magnifierWidth / 2,
            backgroundImage: `url('${src}')`,
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-mousePosition.x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-mousePosition.y * zoomLevel + magnifierHeight / 2}px`,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
