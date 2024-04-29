import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Paper,
  Avatar,
  Slide,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Stack,
  InputLabel,
  FormControl,
  Fab,
  Badge,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import modelsData from "./models-details.json";
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
  alturaMin?: string;
  alturaMax?: string;
}

export default function Models() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleMouseEnter = (model: Model) => {
    setSelectedModel(model);
  };

  const handleMouseLeave = () => {
    setSelectedModel(null);
  };

  const handleFavoriteToggle = () => {
  // Lógica para lidar com o evento de favoritar
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

  const handlemodelTypeChange = (
    e: SelectChangeEvent<
      | "loiras"
      | "morenas"
      | "ruivas"
      | "orientais"
      | "negras"
      | "mulatas"
      | "duplas"
      | "indiferente"
    >
  ) => {
    handleFilterChange(e.target.value, "modelType");
  };

  const handleshowFaceChange = (
    e: SelectChangeEvent<"sim" | "não" | "indiferente">
  ) => {
    handleFilterChange(e.target.value, "showFace");
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
        <Stack direction="row" spacing={4} justifyContent="center">
          <IconButton
            onClick={() => setFilterOpen(!filterOpen)}
            color="primary"
          >
            <TuneIcon />
            <Typography variant="body1" component="span" ml={1}>
              Filtros
            </Typography>
          </IconButton>
        </Stack>
      </Box>
      {filterOpen && (
        <Stack direction="row" justifyContent="center" mb={2}>
          <Box
            width={400}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FormControl fullWidth>
              <InputLabel id="modelType">Tipo de Modelo</InputLabel>
              <Select
                value={filters.modelType}
                onChange={handlemodelTypeChange}
                variant="standard"
                color="primary"
                id="modelType"
                label="Tipo de Modelo"
                labelId="modelType"
                sx={{
                  mx: 1,
                  bgcolor: "primary.light",
                }}
              >
                <MenuItem
                  value="Selecione o Tipo de Modelo"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                  disabled
                >
                  Selecione o Tipo de Modelo
                </MenuItem>
                <MenuItem
                  value="indiferente"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Indiferente
                </MenuItem>
                <MenuItem
                  value="loiras"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Loiras
                </MenuItem>
                <MenuItem
                  value="morenas"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Morenas
                </MenuItem>
                <MenuItem
                  value="ruivas"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Ruivas
                </MenuItem>
                <MenuItem
                  value="orientais"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Orientais
                </MenuItem>
                <MenuItem
                  value="negras"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Negras
                </MenuItem>
                <MenuItem
                  value="mulatas"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Mulatas
                </MenuItem>
                <MenuItem
                  value="duplas"
                  sx={{
                    bgcolor: "black",
                    color: "gold",
                  }}
                >
                  Duplas
                </MenuItem>
              </Select>
            </FormControl>

            <Box
              width={400}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FormControl fullWidth>
                <InputLabel id="showFace">Mostra o rosto</InputLabel>
                <Select
                  value={filters.showFace || "Mostra o rosto"}
                  onChange={handleshowFaceChange}
                  variant="standard"
                  color="primary"
                  id="showFace"
                  label="Mostra o rosto"
                  labelId="showFace"
                  sx={{ mx: 1, bgcolor: "primary.light" }}
                >
                  <MenuItem
                    value="Mostar o rosto"
                    sx={{ bgcolor: "black", color: "gold" }}
                  ></MenuItem>
                  <MenuItem
                    value="indiferente"
                    sx={{ bgcolor: "black", color: "gold" }}
                  >
                    Indiferente
                  </MenuItem>
                  <MenuItem
                    value="sim"
                    sx={{ bgcolor: "black", color: "gold" }}
                  >
                    Mostra o rosto
                  </MenuItem>
                  <MenuItem
                    value="nao"
                    sx={{ bgcolor: "black", color: "gold" }}
                  >
                    Não mostra o rosto
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Stack>
      )}
      <Grid container justifyContent="center" spacing={1}>
        {filteredModels.map((model) => (
          <Grid item key={model.id} xs={12} sm={6} md={4} zIndex={999}>
            <Box
              bgcolor="primary.dark"
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="center"
              onMouseEnter={() => handleMouseEnter(model as Model)}
              onMouseLeave={handleMouseLeave}
              sx={{ marginBottom: 2 }}
              zIndex={999}
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
                      zIndex: 999,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      bgcolor: "rgba(0, 0, 0, 0.97)",
                      color: "primary.light",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      {model.name}
                    </Typography>

                    <Grid container spacing={0} zIndex={999}>
                      <Grid item xs={4}>
                        <Box>
                          <Typography variant="body2" gutterBottom>
                            Idade: {model.age}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Altura: {model.height}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Peso: {model.weight}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box>
                          <Typography variant="body2" gutterBottom>
                            Olhos: {model.eyeColor}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Busto: {model.bust}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Cintura: {model.waist}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Box>
                          <Typography variant="body2" gutterBottom>
                            Quadril: {model.hips}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Pés: {model.feet}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Avatar
                      alt={model.name}
                      src={model.avatar}
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        width: 40,
                        height: 40,
                        zIndex: 900,
                      }}
                    />
                    <Fab
                      color="inherit"
                      size="small"
                      sx={{
                        bgcolor: "transparent",
                        position: "absolute",
                        zIndex: 600,
                        top: 5,
                        right: 25,
                      }}
                    >
                      {model.hasVideoVerification === true ? (
                        <Badge badgeContent={"Verified"} color="success" />
                      ) : (
                        <Badge badgeContent={"Unverified"} color="error" />
                      )}
                    </Fab>
                    <Fab
                      color="inherit"
                      size="small"
                      sx={{
                        bgcolor: "green",
                        position: "absolute",
                        zIndex: 600,
                        bottom: 15,
                        right: 15,
                      }}
                    >
                      <WhatsAppIcon />
                    </Fab>
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
                  zIndex: 650,
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
