import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Snackbar } from "@mui/material";
import modelsData from "../../db/models-details.json";
import ImageBox from "../../components/ImageBox";
import Loading from "../../components/Loading";
import { Model } from "../../types/Model";

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);

  // Simula o carregamento por 2 segundos
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

  const handleFavoriteToggle = (modelId: number) => {
    const updatedFavorites = favorites.includes(modelId)
      ? favorites.filter((id) => id !== modelId)
      : [...favorites, modelId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSnackbarOpen(true);
  };

  const handleMouseEnter = (model: Model) => {
    setSelectedModel(model);
  };

  const handleMouseLeave = () => {
    setSelectedModel(null);
  };

  return (
    <Box textAlign="center">
      {loading && <Loading />}
      <Box mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Modelos Favoritos
        </Typography>
      </Box>
      <Grid container justifyContent="center" spacing={1}>
        {modelsData
          .filter((model) => favorites.includes(model.id))
          .map((model) => (
            <Grid item key={model.id} xs={12} sm={6} md={4}>
              <Box
                bgcolor="primary.dark"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                onMouseEnter={() => handleMouseEnter(model as Model)}
                onMouseLeave={handleMouseLeave}
                sx={{ marginBottom: 2 }}
              >
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={snackbarOpen}
                  autoHideDuration={2000}
                  onClose={() => setSnackbarOpen(false)}
                  message="Modelo removido dos favoritos"
                  sx={{ zIndex: 9999, mt: 5 }}
                />

                <ImageBox
                  src={model.album.profilePicture}
                  id={model.id}
                  alt={model.modelProfile.name}
                  modelAvatar={model.album.avatar}
                  onFavoriteToggle={() => handleFavoriteToggle(model.id)}
                  handleSnackbar={() => setSnackbarOpen(true)}
                />
                {selectedModel !== null && selectedModel === model && (
                  <div>{/* Add model details here */}</div>
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
                  {model.modelProfile.name}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
