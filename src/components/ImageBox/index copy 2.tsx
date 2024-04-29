import React, { useState } from "react";
import { Avatar, Box, Fab, Link, Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

const ImageBox = ({
  src,
  alt,
  modelAvatar,
  onFavoriteToggle,
}: {
  src: string;
  alt: string;
  modelAvatar: string;
  onFavoriteToggle: () => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    onFavoriteToggle();
  };

  const preventClickPropagation = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      zIndex={600}
    >
      <Link href={`/models/${alt.toLowerCase()}`}>
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Link>
      <Stack
        bgcolor={"rgba(0, 0, 0, 0.5)"}
        width="100%"
        height="100px"
        position="absolute"
        zIndex={500}
        sx={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Avatar
          alt={alt}
          src={modelAvatar}
          sx={{
            position: "absolute",
            zIndex: 600,
            bottom: 15,
            left: 15,
            width: 75,
            height: 75,
            bgcolor: "white",
          }}
        />
      </Stack>
      <Fab
        color={isFavorite ? "secondary" : "primary"}
        size="small"
        onMouseDown={preventClickPropagation}
        onClick={toggleFavorite}
        sx={{
          position: "absolute",
          zIndex: 700,
          top: 15,
          right: 15,
        }}
      >
        <FavoriteIcon />
      </Fab>
    </Box>
  );
};

export default ImageBox;
