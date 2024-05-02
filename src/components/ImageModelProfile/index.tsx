import React from "react";
import { Box } from "@mui/material";


const ImageModelProfile = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
  modelAvatar: string;
}) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      zIndex={600}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default ImageModelProfile;
