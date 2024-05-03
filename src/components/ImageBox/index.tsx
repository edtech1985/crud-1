import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Fab,
  Link,
  Popover,
  Button,
  Stack,
  Tooltip,
  Zoom,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import modelsData from "../../db/models-details.json";

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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const isModelFavorite = storedFavorites.includes(id);
    setIsFavorite(isModelFavorite);
  }, [id]);

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    onFavoriteToggle();
    handleSnackbar();

    let storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (modelId: number) => modelId !== id
      );
    } else {
      storedFavorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
  };

  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const shareId = open ? "simple-popover" : undefined;

  const handleShare = (method: string) => {
    const model = modelsData.find((m) => m.id === id);
    if (model) {
      const modelProfileLink = `https://example.com/models/${model.name}`;
      if (method === "whatsapp") {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Confira o perfil de ${model.name}: ${modelProfileLink}`
          )}`
        );
      } else if (method === "copy") {
        navigator.clipboard.writeText(modelProfileLink);
        alert("Link copiado para a área de transferência!");
      }
    }
    handleShareClose();
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
      borderRadius={6}
    >
      <Link href={`/models/${alt.toLowerCase()}`}>
        <Zoom in={true} timeout={250} style={{ transitionDelay: "50ms" }}>
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Zoom>
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
      <Fab
        size="small"
        aria-describedby={shareId}
        onClick={handleShareClick}
        sx={{
          bgcolor: "white",
          color: "#60541E",
          "&:hover": {
            color: "#8202DC",
          },
          position: "absolute",
          zIndex: 999,
          top: 15,
          left: 15,
        }}
      >
        <Tooltip title="Compartilhe com um amigo" arrow>
          <ShareIcon />
        </Tooltip>
      </Fab>

      <Popover
        id={shareId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleShareClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack direction="column" sx={{ bgcolor: "rgba(96, 84, 30, 0.75)" }}>
          <Button
            sx={{ color: "yellow" }}
            onClick={() => handleShare("whatsapp")}
          >
            Compartilhar via WhatsApp
          </Button>
          <Button sx={{ color: "yellow" }} onClick={() => handleShare("copy")}>
            Copiar Link
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
};

export default ImageBox;
