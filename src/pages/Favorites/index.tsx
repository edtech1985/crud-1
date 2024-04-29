import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Slide,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

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

interface Filters {
  modelType:
    | "loiras"
    | "morenas"
    | "ruivas"
    | "orientais"
    | "negras"
    | "mulatas"
    | "duplas"
    | "indiferente"
    | "";
  showFace: "sim" | "não" | "indiferente";
}

export default function Favorites() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = Object.keys(localStorage);
    setFavorites(storedFavorites);
  }, []);

  const handleMouseEnter = (model: Model) => {
    setSelectedModel(model);
  };

  const handleMouseLeave = () => {
    setSelectedModel(null);
  };

  const handleFavoriteToggle = () => {
    const storedFavorites = Object.keys(localStorage);
    setFavorites(storedFavorites);
  };

  // === === === BEGIN FILTERING === === === //

  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    modelType: "indiferente",
    showFace: "indiferente",
  });

  const handleFilterChange = (value: string, filterName: keyof Filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handlemodelTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    handleFilterChange(e.target.value as string, "modelType");
  };

  const handleshowFaceChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    handleFilterChange(e.target.value as string, "showFace");
  };

  const filteredModels = modelsData.filter((model) => {
    if (
      filters.modelType !== "indiferente" &&
      model.modelType !== filters.modelType
    ) {
      return false;
    }
    if (
      filters.showFace !== "indiferente" &&
      model.showFace !== filters.showFace
    ) {
      return false;
    }
    return true;
  });

  const favoriteModels = filteredModels.filter((model) =>
    favorites.includes(model.name)
  );

  return (
    <Box textAlign="center">
      <Box mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nossas Modelos
        </Typography>
        <Typography variant="body1" paragraph>
          Nossos terapeutas e massagistas são dedicados exclusivamente a
          proporcionar o máximo de prazer e relaxamento ao público masculino.
        </Typography>
        <IconButton onClick={() => setFilterOpen(!filterOpen)} color="primary">
          <TuneIcon />
          <Typography variant="body1" component="span" ml={1}>
            Filtros
          </Typography>
        </IconButton>
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
              onMouseEnter={() => handleMouseEnter(model as Model)}
              onMouseLeave={handleMouseLeave}
              sx={{ marginBottom: 2 }}
            >
              <ImageBox
                src={model.profilePicture}
                alt={model.name}
                modelAvatar={model.avatar}
                onFavoriteToggle={handleFavoriteToggle}
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
