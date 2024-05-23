import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import {
  NavigateBefore,
  NavigateNext,
  NewReleases,
  Opacity,
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
import styles from "./ModelProfile.module.css";
import {
  UnverifiedTooltip,
  VerifiedTooltip,
} from "../../../components/Tooltips";

interface ModelProfileProps {
  name: string;
  photos?: string[];
}

const ModelProfile: React.FC<ModelProfileProps> = () => {
  const [open, setOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { name: modelName } = useParams<{ name: string }>();

  const model = modelsData.find(
    (model: { name: string }) => model.name.toLowerCase() === modelName
  );

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

  const {
    name,
    description,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    hasVideoVerification,
    age,
    height,
    weight,
    hasLocation,
    location,
    services,
    availableForTravel,
    hourlyRate,
    paymentMethods,
    workHours,
  } = model;

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalContentStyle = {
    backgroundColor: "#0a0a0a",
    /* Cor de fundo do modal */
    border: "10px solid #ffd700",
    borderRadius: "20px",
    outline: "none" /* Remover contorno ao redor do modal */,
    padding: "20px",
    position: "relative",
    maxWidth: "50vw",
    maxHeight: "90vh",
    overflow: "hidden" /* Ocultar rolagem do conteúdo do modal */,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "70vh", /* Altura máxima do modal - altura dos botões de navegação e miniaturas */
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
    display: 'flex', // Replace 'flex' with a string value
    justifyContent: 'center', // Replace 'justify- content' with 'justifyContent'
    position: 'absolute',
    bottom: 0,
    width: '90%', // Add quotes around the percentage value
    marginBottom: '10px', // Replace 'margin - bottom' with 'marginBottom'
    gap: '5px', // Add quotes around the pixel value
  };

  const thumbnailStyle = {
    width: '50px', 
    height: '50px',
    opacity: 0.25,
    cursor: 'pointer',
  };

  return (
    <Box textAlign="center">
      <Grid container spacing={2} p={{ base: 2, md: 3 }}>
        <Grid item xs={12} md={3} textAlign="left">
          <Box mb={2}>
            <BackButton />
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Box id="model-profile" mb={4}>
            <Typography variant="edtech">Perfil</Typography>
            <table>
              <tbody>
                <tr>
                  <td>Nome:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Verificação de Vídeo:</td>
                  <td>
                    {hasVideoVerification ? (
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
                  <td>{age}</td>
                </tr>
                <tr>
                  <td>Altura:</td>
                  <td>{height}</td>
                </tr>
                <tr>
                  <td>Peso:</td>
                  <td>{weight}</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box id="model-service" mb={4}>
            <Typography variant="edtech">Atendimento</Typography>
            <table>
              <tbody>
                <tr>
                  <td>Local:</td>
                  <td>
                    {hasLocation ? `Com local (${location})` : "Sem local"}
                  </td>
                </tr>
                <tr>
                  <td>Atende em:</td>
                  <td>{services.join(", ")}</td>
                </tr>
                <tr>
                  <td>Disponível para viagens:</td>
                  <td>{availableForTravel ? "Sim" : "Não"}</td>
                </tr>
                <tr>
                  <td>Cachê por 1h:</td>
                  <td>{hourlyRate}</td>
                </tr>
                <tr>
                  <td>Formas de pagamento:</td>
                  <td>{paymentMethods.join(", ")}</td>
                </tr>
                <tr>
                  <td>Horário de atendimento:</td>
                  <td>{workHours}</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box id="social-media">
            <Typography variant="edtech">Redes Sociais</Typography>
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
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {[photo1, photo2, photo3, photo4, photo5, photo6].map(
              (photo: string, index: number) => (
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
                      alt={`model ${name}`}
                      aria-label={`model ${name}`}
                      modelAvatar={model.avatar}
                    />
                  </Box>
                </Grid>
              )
            )}
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
          <div className={styles.modalContent}>
            {/* Foto principal */}
            <img src={model.photos[selectedPhotoIndex]} alt={`model ${name}`} />
            {/* Botões de navegação */}
            <Box justifyContent="space-between" width="100%" height="50px">
              <IconButton onClick={handlePrevPhoto} sx={prevButtonStyle}>
                <NavigateBefore sx={{ width: 50, height: 50 }} />
              </IconButton>
              <IconButton onClick={handleNextPhoto} sx={nextButtonStyle}>
                <NavigateNext sx={{ width: 50, height: 50 }} />
              </IconButton>
              {/* Miniaturas */}
              <div className={styles.thumbnailContainer}>
                {model.photos.map((photo: string, index: number) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`thumbnail ${index}`}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className={
                      index === selectedPhotoIndex
                        ? styles.activeThumbnail
                        : styles.thumbnail
                    }
                  />
                ))}
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModelProfile;
