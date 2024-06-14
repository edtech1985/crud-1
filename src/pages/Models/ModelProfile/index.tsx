import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Stack,
  Modal,
  Fade,
  Chip,
} from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  NewReleases,
  Telegram,
  Verified,
  X,
} from "@mui/icons-material";
import modelsData from "../../../db/models-details.json";
import BackButton from "../../../components/buttons/backButton";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Instagram from "@mui/icons-material/Instagram";
import Facebook from "@mui/icons-material/Facebook";
import ImageModelProfile from "../../../components/ImageModelProfile";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import {
  UnverifiedTooltip,
  VerifiedTooltip,
} from "../../../components/Tooltips";
import Loading from "../../../components/Loading";

interface ModelProfileProps {
  name: string;
  photos?: string[];
}

const ModelProfile: React.FC<ModelProfileProps> = () => {
  const [open, setOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { name: modelName } = useParams<{ name: string }>();
  const [loading, setLoading] = useState(true);
  const model = modelsData.find(
    (model: { modelProfile: { name: string } }) =>
      model.modelProfile.name.toLowerCase() === modelName
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []); // Executa apenas uma vez após o carregamento inicial

  if (!model) {
    return (
      <Typography>Detalhes sobre a acompanhante não encontrados.</Typography>
    );
  }

  const handleOpenModal = (index: number) => {
    setSelectedPhotoIndex(index);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prevIndex) =>
      prevIndex === model.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prevIndex) =>
      prevIndex === 0 ? model.photos.length - 1 : prevIndex - 1
    );
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalContentStyle = {
    backgroundColor: "#0a0a0a",
    border: "10px solid #ffd700",
    borderRadius: "20px",
    outline: "none" /* Remover contorno ao redor do modal */,
    padding: "20px",
    position: "relative",
    maxWidth: "50vw",
    maxHeight: "90vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      maxWidth: "100%",
      height: "70vh",
      objectFit: "contain",
    },
  };

  const iconButtonStyle: React.CSSProperties & {
    "&:hover": React.CSSProperties;
  } = {
    position: "absolute",
    transform: "translateY(-300%)",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: "50%",
    width: 50,
    height: 50,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const prevButtonStyle = {
    ...iconButtonStyle,
    left: 0,
  };

  const nextButtonStyle = {
    ...iconButtonStyle,
    right: 0,
  };

  const thumbnailContainerStyle = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "90%",
    marginBottom: "10px",
    gap: "5px",

    "& img": {
      width: "50px",
      height: "50px",
      opacity: 0.25,
      cursor: "pointer",
    },
  };

  const thumbnailContainerActiveStyle = {
    opacity: 1,
  };

  const backdropStyle = {
    backdropFilter: "blur(8px)",
  };

  const thumbnailStyle = {
    width: "50px",
    height: "50px",
    cursor: "pointer",
    opacity: 0.25,
  };

  const activeThumbnailStyle = {
    opacity: 1,
  };

  const ProfileSection = () => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <Box id="model-profile" mb={4}>
        {loading && <Loading />}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={toggleExpand}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="edtech">Perfil</Typography>
          {/* Ícone de seta para cima ou para baixo dependendo do estado */}
          <IconButton>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {expanded && (
          <table>
            <tbody>
              <tr>
                <td>Nome:</td>
                <td>{model.modelProfile.name}</td>
              </tr>
              <tr>
                <td>Verificação de Vídeo:</td>
                <td>
                  {model.hasVideoVerification ? (
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
                            cursor: "help",
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
                            cursor: "help",
                          }}
                        />
                      </UnverifiedTooltip>
                    </Box>
                  )}
                </td>
              </tr>
              <tr>
                <td>Idade:</td>
                <td>{model.modelDetails.age}</td>
              </tr>
              <tr>
                <td>Altura:</td>
                <td>{model.modelDetails.height}</td>
              </tr>
              <tr>
                <td>Peso:</td>
                <td>{model.modelDetails.weight}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Box>
    );
  };

  const ServicesSection = () => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <Box id="model-service" mb={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={toggleExpand}
          sx={{ cursor: "pointer" }}
        >
          {" "}
          <Typography variant="edtech">Atendimento</Typography>
          {/* Ícone de seta para cima ou para baixo dependendo do estado */}
          <IconButton>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {/* Conteúdo expansível */}
        {expanded && (
          <table>
            <tbody>
              <tr>
                <td>Local:</td>
                <td>
                  {model.hasLocation
                    ? `Com local (${model.localInfo.neighborhood})`
                    : "Sem local"}
                </td>
              </tr>
              <tr>
                <td>Atende em:</td>
                <td>{model.services.servicesLocations.join(", ")}</td>
              </tr>
              <tr>
                <td>Disponível para viagens:</td>
                <td>{model.services.availableForTravel ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td>Cachê por 1h:</td>
                <td>{model.services.hourlyRate}</td>
              </tr>
              <tr>
                <td>Formas de pagamento:</td>
                <td>{model.services.paymentMethods.join(", ")}</td>
              </tr>
              <tr>
                <td>Horário de atendimento:</td>
                <td>{model.services.workHours}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Box>
    );
  };

  const SocialMediaSection = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <Box id="social-media">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={toggleExpand}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="edtech">Redes Sociais</Typography>
          {/* Ícone de seta para cima ou para baixo dependendo do estado */}
          <IconButton>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {/* Conteúdo expansível */}
        {expanded && (
          <Stack direction="column" alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: "transparent", color: "green" }}>
              <WhatsApp />
            </Avatar>
            <Avatar src="/img/only.png" sx={{ width: 36, height: 36 }} />
            <Avatar src="/img/privacy.png" sx={{ width: 28, height: 28 }} />
            <Avatar sx={{ bgcolor: "transparent", color: "#c93a52" }}>
              <Instagram />
            </Avatar>
            <Avatar sx={{ bgcolor: "transparent", color: "#fff" }}>
              <X />
            </Avatar>
            <Avatar sx={{ bgcolor: "transparent", color: "blue" }}>
              <Facebook />
            </Avatar>
            <Avatar src="/img/tiktok.png" sx={{ width: 34, height: 34 }} />
            <Avatar sx={{ bgcolor: "transparent", color: "#0b84ca" }}>
              <Telegram />
            </Avatar>
          </Stack>
        )}
      </Box>
    );
  };

  return (
    <Box textAlign="center">
      <Grid container spacing={2} p={{ base: 2, md: 3 }}>
        <Grid item xs={12} md={3} textAlign="left">
          <Box mb={2}>
            <BackButton />
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>
            {model.modelProfile.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {model.modelProfile.description}
          </Typography>
          <ProfileSection />
          <ServicesSection />

          <SocialMediaSection />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {[
              model.album.photo1,
              model.album.photo2,
              model.album.photo3,
              model.album.photo4,
              model.album.photo5,
              model.album.photo6,
            ].map((photo: string, index: number) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => handleOpenModal(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <ImageModelProfile
                    src={photo}
                    alt={`model ${model.modelProfile.name}`}
                    aria-label={`model ${model.modelProfile.name}`}
                    modelAvatar={model.album.avatar}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal
        sx={modalStyle}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalContentStyle}>
            {/* Foto principal */}
            <img
              src={model.photos[selectedPhotoIndex]}
              alt={`model ${model.modelProfile.name}`}
            />
            {/* Botões de navegação */}
            <Box justifyContent="space-between" width="100%" height="50px">
              <IconButton onClick={handlePrevPhoto} sx={prevButtonStyle}>
                <NavigateBefore sx={{ width: 50, height: 50 }} />
              </IconButton>
              <IconButton onClick={handleNextPhoto} sx={nextButtonStyle}>
                <NavigateNext sx={{ width: 50, height: 50 }} />
              </IconButton>
              {/* Miniaturas */}
              <Box sx={thumbnailContainerStyle}>
                {model.photos.map((photo: string, index: number) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`thumbnail ${index}`}
                    onClick={() => setSelectedPhotoIndex(index)}
                    style={
                      index === selectedPhotoIndex
                        ? activeThumbnailStyle
                        : thumbnailStyle
                    }
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModelProfile;
