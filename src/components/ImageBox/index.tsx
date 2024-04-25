import React, { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";

import modelsData from "../../pages/Models/models-details.json";

const model = modelsData[0];

const ImageBox = ({
  src,
  alt,
  modelAvatar,
}: {
  src: string;
  alt: string;
  modelAvatar: string;
}) => {
  return (
    <Box width="300px" height="300px" overflow="hidden">
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <Avatar
        alt={alt}
        src={modelAvatar}
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 40,
          height: 40,
        }}
      />
    </Box>
  );
};

export default ImageBox;
