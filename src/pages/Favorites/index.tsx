import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Slide, Paper, IconButton } from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";

import modelsData from "../Models/models-details.json";
import ImageBox from "../../components/ImageBox";

interface Model {
  id: number;
  name: string;
  profilePicture: string;
  avatar: string;
  age: number;
  height: string;
  weight: string;
  eyeColor: string;
  bust: string;
  waist: string;
  hips: string;
  feet: string;
  modelType: string;
  showFace: string;
}

export default function Favorites() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleMouseEnter = (model: Model) => {
    setSelectedModel(model);
  };

  const handleMouseLeave = () => {
    setSelectedModel(null);
  };

  const handleFavoriteToggle = (modelId: number) => {
    let updatedFavorites: number[] = [];
    if (favorites.includes(modelId)) {
      updatedFavorites = favorites.filter((id) => id !== modelId);
    } else {
      updatedFavorites = [...favorites, modelId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const favoriteModels = modelsData.filter((model) =>
    favorites.includes(model.id)
  );

  return (
    <Box textAlign="center">
      <Box mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Modelos Favoritos
        </Typography>
        {/* Removido o botão de filtros */}
      </Box>
      <Grid container justifyContent="center" spacing={1}>
        {favoriteModels.map((model) => (
          <Grid item key={model.id} xs={12} sm={6} md={4}>
            <Box
              bgcolor="primary.dark"
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="center"
              onMouseEnter={() => handleMouseEnter(model)}
              onMouseLeave={handleMouseLeave}
              sx={{ marginBottom: 2 }}
            >
              <ImageBox
                src={model.profilePicture}
                id={model.id}
                alt={model.name}
                modelAvatar={model.avatar}
                onFavoriteToggle={() => handleFavoriteToggle(model.id)}
                handleSnackbar={() => {}}
              />
              {selectedModel === model && (
                <Slide
                  direction="up"
                  in={true}
                  mountOnEnter
                  unmountOnExit
                  timeout={1000}
                >
                  <Paper
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      bgcolor: "rgba(0, 0, 0, 0.97)",
                      color: "primary.light",
                    }}
                  >
                    {/* Adicione os detalhes do modelo aqui */}
                  </Paper>
                </Slide>
              )}
              <Typography
                variant="subtitle2"
                component="p"
                sx={{
                  position: "absolute",
                  bottom: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  fontWeight: "bold",
                  textShadow: "-3px 5px 3px black",
                }}
              >
                {model.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}