import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
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
  Chip,
  Button,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import modelsData from "../../db/models-details.json";
import ImageBox from "../../components/ImageBox";
import Fade from "@mui/material/Fade";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Model } from "../../types";
import {
  BustTooltip,
  UnverifiedTooltip,
  VerifiedTooltip,
  WhatsappTooltip,
} from "../../components/Tooltips";
import { NewReleases, Verified } from "@mui/icons-material";
import Loading from "../../components/Loading";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams } from "react-router-dom";
import NewBreadcrumbs from "../../components/NewBreadcrumbs";
import { CityContext } from "../../context/CityContext";

interface Filters {
  city: string;
  modelType: string;
  showFace: string;
  alturaMin?: string;
  alturaMax?: string;
}

interface State extends SnackbarOrigin {
  open: boolean;
}
const MenuItemStyles = {
  bgcolor: "black",
  color: "gold",
};

const firstPage = "Home";
const pathToFirstPage = "/";
const pageTitle = "Acompanhantes";

export default function Models() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [snackbarStates, setSnackbarStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [filterOpen, setFilterOpen] = useState(false);
  const { city } = React.useContext(CityContext);
  const [filters, setFilters] = useState<Filters>({
    city: city || "",
    modelType: "indiferente",
    showFace: "indiferente",
  });
  const [loading, setLoading] = useState(true); 
  const [models, setModels] = useState<Model[]>([]);
  const { estado, cidade } = useParams<{ estado: string; cidade: string }>(); 
  const [shuffledModels, setShuffledModels] = useState<Model[]>([]);
  const [shouldShuffle, setShouldShuffle] = useState(true);

  // Filtrar modelos com base na cidade
  useEffect(() => {
    const filteredModels = modelsData.filter((model) => {
      if (model.hasLocation && model.album.profilePicture) {
        return (
          model.localInfo.city.toLowerCase() === (city ?? "").toLowerCase()
        );
      } else {
        return false;
      }
    }) as Model[];

    setModels(filteredModels);
    setLoading(false);
  }, [city]);

  // Filtrar as modelos com base no estado e na cidade
  useEffect(() => {
    const filteredModels = modelsData.filter((model) => {
      if (model.hasLocation && model.album.profilePicture) {
        return (
          model.localInfo.state.toLowerCase() ===
            (estado ?? "").toLowerCase() &&
          model.localInfo.city.toLowerCase() === (cidade ?? "").toLowerCase()
        );
      } else {
        return false;
      }
    }) as Model[];

    setModels(filteredModels);
  }, [estado, cidade]); // Atualize o filtro sempre que o estado ou a cidade mudarem

  // === === === BEGIN MOUSE ENTER AND LEAVE === === === //
  const handleMouseEnter = (model: Model) => {
    setSelectedModel(model);
  };

  const handleMouseLeave = () => {
    setSelectedModel(null);
  };
  // === === === END MOUSE ENTER AND LEAVE === === === //

  // === === === BEGIN SNACKBAR === === === //
  const [state] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  const handleSnackbar = (modelId: number) => {
    setSnackbarStates((prevState) => ({
      ...prevState,
      [modelId]: true,
    }));
  };

  const handleClose = (modelId: number) => {
    setSnackbarStates((prevState) => ({
      ...prevState,
      [modelId]: false,
    }));
  };
  // === === === END SNACKBAR === === === //

  // === === === BEGIN FAVORITES === === === //
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    // Simula o carregamento por 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
  // === === === END FAVORITES === === === //

  // === === === BEGIN FILTERING === === === //
  const handleFilterChange = (value: string, filterName: keyof Filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setShouldShuffle(true); // Marca para embaralhar após a mudança de filtro
  };
  // === === === END FILTERING === === === //

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    handleFilterChange(e.target.value, "city");
  };

  const handlemodelTypeChange = (e: SelectChangeEvent<string>) => {
    handleFilterChange(e.target.value, "modelType");
  };

  const handleshowFaceChange = (e: SelectChangeEvent<string>) => {
    handleFilterChange(e.target.value, "showFace");
  };

  const filteredModels = modelsData.filter((model) => {
    if (filters.city !== "" && model.localInfo.city !== filters.city) {
      return false;
    }
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

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const clearFilters = () => {
    setFilters({
      city: city,
      modelType: "indiferente",
      showFace: "indiferente",
    });
    setShouldShuffle(true); // Marca para embaralhar após a limpeza dos filtros
  };

  const FilterForm = () => (
    <Slide direction="left" in={filterOpen} mountOnEnter unmountOnExit>
      <Box
        component={Paper}
        elevation={4}
        p={2}
        m={2}
        display="flex"
        flexDirection="column"
      >
        <FormControl sx={{ marginBottom: "8px" }}>
          <InputLabel htmlFor="filter-city">Cidade</InputLabel>
          <Select
            id="filter-city"
            value={filters.city}
            onChange={handleCityChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Indiferente</em>
            </MenuItem>
            <MenuItem value="Porto Alegre">Porto Alegre</MenuItem>
            <MenuItem value="Florianópolis">Florianópolis</MenuItem>
            <MenuItem value="Curitiba">Curitiba</MenuItem>
            <MenuItem value="São Paulo">São Paulo</MenuItem>
            <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
            <MenuItem value="Belo Horizonte">Belo Horizonte</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: "8px" }}>
          <InputLabel htmlFor="filter-modelType">Tipo de Modelo</InputLabel>
          <Select
            id="filter-modelType"
            value={filters.modelType}
            onChange={handlemodelTypeChange}
            displayEmpty
          >
            <MenuItem value="indiferente">
              <em>Indiferente</em>
            </MenuItem>
            <MenuItem value="vip">VIP</MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: "8px" }}>
          <InputLabel htmlFor="filter-showFace">Mostrar Rosto</InputLabel>
          <Select
            id="filter-showFace"
            value={filters.showFace}
            onChange={handleshowFaceChange}
            displayEmpty
          >
            <MenuItem value="indiferente">
              <em>Indiferente</em>
            </MenuItem>
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Slide>
  );

  const totalModelsInCity = modelsData.filter(
    (model) => model.localInfo.city === filters.city
  ).length;
  // === === === END FILTERING === === === //

  useEffect(() => {
    // Função para embaralhar os modelos uma vez
    const shuffleModelsOnce = (models: Model[]) => {
      let shuffled = [...models]; // Crie uma cópia do array original
      // Embaralhe o array usando o algoritmo de Fisher-Yates
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Verifica se deve embaralhar os modelos
    if (shouldShuffle && filteredModels.length > 0) {
      const newShuffledModels = shuffleModelsOnce(filteredModels as Model[]);
      setShuffledModels(newShuffledModels);
      setShouldShuffle(false); // Marca que os modelos foram embaralhados
    }
  }, [shouldShuffle, filteredModels]);

  return (
    <Box textAlign="center">
      {loading && <Loading />}
      <NewBreadcrumbs
        firstPage={firstPage}
        pathToFirstPage={pathToFirstPage}
        currentPage={pageTitle}
      />
      <Box id="page-description" mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Acompanhantes em {city}
        </Typography>

        {filters.city && (
          <Typography variant="body1">
            {totalModelsInCity} modelos disponíveis em {filters.city}
          </Typography>
        )}
        {(filters.modelType !== "indiferente" ||
          filters.showFace !== "indiferente") && (
          <Box display="inline">
            {filters.modelType !== "indiferente" && (
              <Typography variant="body1" display="inline">
                {
                  filteredModels.filter(
                    (model) => model.modelType === filters.modelType
                  ).length
                }{" "}
                modelos {filters.modelType}{" "}
              </Typography>
            )}
            {filters.showFace !== "indiferente" && (
              <Typography variant="body1" display="inline">
                {
                  filteredModels.filter(
                    (model) => model.showFace === filters.showFace
                  ).length
                }{" "}
                modelos {filters.showFace === "sim" ? "mostram" : "não mostram"}{" "}
                o rosto.
              </Typography>
            )}
          </Box>
        )}

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
        <Grid container justifyContent="center" spacing={2} mb={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="city">Cidade</InputLabel>
              <Select
                value={filters.city}
                onChange={handleCityChange}
                variant="standard"
                color="primary"
                id="city"
                label="Cidade"
                labelId="city"
                sx={{
                  mx: 1,
                  bgcolor: "primary.light",
                }}
              >
                <MenuItem
                  value="Selecione a cidade"
                  sx={{ MenuItemStyles }}
                  disabled
                >
                  Selecione a Cidade
                </MenuItem>
                <MenuItem value="Porto Alegre" sx={{ MenuItemStyles }}>
                  Porto Alegre
                </MenuItem>
                <MenuItem value="Canoas" sx={{ MenuItemStyles }}>
                  Canoas
                </MenuItem>
                <MenuItem value="Novo Hamburgo" sx={{ MenuItemStyles }}>
                  Novo Hamburgo
                </MenuItem>
                <MenuItem value="São Leopoldo" sx={{ MenuItemStyles }}>
                  São Leopoldo
                </MenuItem>
                <MenuItem value="Florianópolis" sx={{ MenuItemStyles }}>
                  Florianópolis
                </MenuItem>
                <MenuItem value="Camboriú" sx={{ MenuItemStyles }}>
                  Camboriú
                </MenuItem>
                <MenuItem value="Joinville" sx={{ MenuItemStyles }}>
                  Joinville
                </MenuItem>
                <MenuItem value="Blumenau" sx={{ MenuItemStyles }}>
                  Blumenau
                </MenuItem>
                <MenuItem value="Itajaí" sx={{ MenuItemStyles }}>
                  Itajaí
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
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
                  sx={{ MenuItemStyles }}
                  disabled
                >
                  Selecione o Tipo de Modelo
                </MenuItem>
                <MenuItem value="indiferente" sx={{ MenuItemStyles }}>
                  Indiferente
                </MenuItem>
                <MenuItem value="loiras" sx={{ MenuItemStyles }}>
                  Loiras
                </MenuItem>
                <MenuItem value="morenas" sx={{ MenuItemStyles }}>
                  Morenas
                </MenuItem>
                <MenuItem value="ruivas" sx={{ MenuItemStyles }}>
                  Ruivas
                </MenuItem>
                <MenuItem value="orientais" sx={{ MenuItemStyles }}>
                  Orientais
                </MenuItem>
                <MenuItem value="negras" sx={{ MenuItemStyles }}>
                  Negras
                </MenuItem>
                <MenuItem value="mulatas" sx={{ MenuItemStyles }}>
                  Mulatas
                </MenuItem>
                <MenuItem value="duplas" sx={{ MenuItemStyles }}>
                  Duplas
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
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
                  sx={{ MenuItemStyles }}
                ></MenuItem>
                <MenuItem value="indiferente" sx={{ MenuItemStyles }}>
                  Indiferente
                </MenuItem>
                <MenuItem value="sim" sx={{ MenuItemStyles }}>
                  Mostra o rosto
                </MenuItem>
                <MenuItem value="nao" sx={{ MenuItemStyles }}>
                  Não mostra o rosto
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid container justifyContent="center" spacing={1}>
        {filteredModels.length === 0 ? (
          <Typography variant="body1" paragraph>
            Nenhuma modelo encontrada com os filtros selecionados. Por favor,
            escolha outros filtros.
          </Typography>
        ) : (
          shuffledModels.map((model) => (
            <Grid item key={model.id} xs={12} sm={6} md={4} zIndex={999}>
              <Box
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                onMouseEnter={() => handleMouseEnter(model as Model)}
                onMouseLeave={handleMouseLeave}
                zIndex={999}
              >
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={snackbarStates[model.id] || false}
                  autoHideDuration={2000}
                  onClose={() => handleClose(model.id)}
                  message={
                    favorites.includes(model.id)
                      ? "Modelo adicionado aos favoritos"
                      : "Modelo removido dos favoritos"
                  }
                  key={vertical + horizontal}
                  sx={{ zIndex: 9999, mt: 5 }}
                />

                <ImageBox
                  src={model.album.profilePicture}
                  id={model.id}
                  alt={model.modelProfile.name}
                  modelAvatar={model.album.avatar}
                  onFavoriteToggle={() => handleFavoriteToggle(model.id)}
                  handleSnackbar={() => handleSnackbar(model.id)}
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
                        {model.modelProfile.name}
                      </Typography>
                      <Grid
                        id="model-details"
                        container
                        spacing={0}
                        zIndex={999}
                      >
                        <Grid item xs={4}>
                          <Box id="model-details-1">
                            <Typography variant="body2" gutterBottom>
                              Idade: {model.modelDetails.age}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Altura: {model.modelDetails.height}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Peso: {model.modelDetails.weight}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box id="model-details-2">
                            <Typography variant="body2" gutterBottom>
                              Olhos: {model.modelDetails.eyeColor}
                            </Typography>
                            <BustTooltip
                              title={
                                "Tipo de busto: " + model.modelDetails.bustType
                              }
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 700 }}
                              placement="top"
                              arrow
                            >
                              <Typography variant="body2" gutterBottom>
                                Busto: {model.modelDetails.bust}
                              </Typography>
                            </BustTooltip>
                            <Typography variant="body2" gutterBottom>
                              Cintura: {model.modelDetails.waist}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box id="model-details-3">
                            <Typography variant="body2" gutterBottom>
                              Quadril: {model.modelDetails.hips}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Pés: {model.modelDetails.feet}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} pt={2}>
                          <Box
                            id="model-location"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                          >
                            <LocationOnIcon />
                            {model.hasLocation ? (
                              <Typography>
                                {model.localInfo.neighborhood}
                              </Typography>
                            ) : (
                              <Typography>Sem local</Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                      <Avatar
                        alt={model.modelProfile.name}
                        src={model.album.avatar}
                        sx={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          width: 40,
                          height: 40,
                          zIndex: 900,
                        }}
                      />{" "}
                      <Fab
                        size="small"
                        sx={{
                          bgcolor: "transparent",
                          position: "absolute",
                          zIndex: 600,
                          top: 5,
                          right: 40,
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                      >
                        {model.hasVideoVerification === true ? (
                          <Box
                            sx={{
                              width: "fit-content",
                              borderRadius: "16px",
                            }}
                          >
                            <VerifiedTooltip
                              title="Esta modelo enviou o vídeo de verificação a menos de 6 meses."
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 700 }}
                              placement="top"
                              arrow
                            >
                              <Chip
                                label="Verified"
                                size="small"
                                icon={<Verified />}
                                color="success"
                                sx={{
                                  "&:hover": {
                                    bgcolor: "green",
                                  },
                                }}
                              />
                            </VerifiedTooltip>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: "fit-content",
                              borderRadius: "16px",
                            }}
                          >
                            <UnverifiedTooltip
                              title="Esta modelo ainda não enviou o vídeo de verificação."
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 700 }}
                              placement="top"
                              arrow
                            >
                              <Chip
                                label="Unverified"
                                size="small"
                                icon={<NewReleases />}
                                color="error"
                                sx={{
                                  "&:hover": {
                                    bgcolor: "red",
                                  },
                                }}
                              />
                            </UnverifiedTooltip>
                          </Box>
                        )}
                      </Fab>
                      <WhatsappTooltip
                        title="Enviar mensagem via WhatsApp"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 700 }}
                        placement="top"
                        arrow
                      >
                        <Fab
                          id="whatsapp-button"
                          size="small"
                          sx={{
                            color: "white",
                            bgcolor: "green",
                            border: "solid 2px green",
                            "&:hover": {
                              color: "#8D7B26",
                              bgcolor: "black",
                              borderColor: "#8D7B26",
                              borderWidth: 2,
                            },
                            position: "absolute",
                            zIndex: 600,
                            bottom: 15,
                            right: 15,
                          }}
                          onClick={() => {
                            if (selectedModel) {
                              const whatsappNumber =
                                selectedModel.socialMedia.whatsapp;
                              const url = `https://wa.me/${whatsappNumber}`;
                              window.open(url, "_blank");
                            }
                          }}
                        >
                          <WhatsAppIcon />
                        </Fab>
                      </WhatsappTooltip>
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
                  {model.modelProfile.name}
                </Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
