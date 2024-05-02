import React, { useEffect, useState } from "react";
import { Avatar, Box, Fab, Link, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";



const ImageBox = ({
  src,
  id,
  alt,
  modelAvatar,
  onFavoriteToggle,
  handleSnackbar,
}: {
  src: string;
  id: number;
  alt: string;
  modelAvatar: string;
  onFavoriteToggle: () => void;
  handleSnackbar: () => void;
}) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Recupera as informações do localStorage ao montar o componente
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const isModelFavorite = storedFavorites.includes(id);
    setIsFavorite(isModelFavorite);
  }, [id]); // Executa apenas quando id muda

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    onFavoriteToggle();
    handleSnackbar();

    let storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      // Remove o ID do modelo dos favoritos
      storedFavorites = storedFavorites.filter(
        (modelId: number) => modelId !== id
      );
    } else {
      // Adiciona o ID do modelo aos favoritos
      storedFavorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
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
        size="small"
        onMouseDown={preventClickPropagation}
        onClick={toggleFavorite}
        sx={{
          "&:hover": {
            color: isFavorite ? "grey" : "#DB3937",
          },
          color: isFavorite ? "#ffffff" : "#FFD770",
          bgcolor: isFavorite ? "#8202DC" : "#60541E",
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