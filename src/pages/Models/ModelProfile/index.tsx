import React from "react";
import { Box, Typography, Grid, Avatar, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import modelsData from "../models-details.json";
import BackButton from "../../../components/buttons/backButton";
import ImageBox from "../../../components/ImageBox";

interface ModelProfileProps {
  name: string;
}

const ModelProfile: React.FC<ModelProfileProps> = () => {
  const { name: massagistName } = useParams<{ name: string }>();

  const massagist = modelsData.find(
    (model: { name: string }) => model.name.toLowerCase() === massagistName
  );

  if (!massagist) {
    return (
      <Typography>Detalhes sobre o massagista não encontrados.</Typography>
    );
  }

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
    socialMedia,
  } = massagist;

  return (
    <Box textAlign="center">
      <Grid
        container
        justifyContent="center"
        spacing={1}
        p={{ base: 2, md: 3 }}
      >
        <Grid item xs={12}>
          <Box textAlign="left">
            <BackButton />
          </Box>
        </Grid>
        <Grid item xs={12} mx={10}>
          <Typography variant="h4" component="h1" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Grid id="model-photos" item xs={12} bgcolor="yellow">
            <Grid container justifyContent="center" spacing={2}>
              {[photo1, photo2, photo3, photo4, photo5, photo6].map(
                (photo, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Box
                      position="relative"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <ImageBox
                        src={photo}
                        alt={`Massagista ${name}`}
                        aria-label={`Massagista ${name}`}
                        modelAvatar={massagist.avatar}
                      />
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
          <Grid
            id="model-info"
            container
            spacing={2}
            justifyContent="center"
            
            mt={4}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Informações</Typography>
              <Box>
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
                          <IconButton>
                            <CheckCircleOutline style={{ color: "green" }} />
                          </IconButton>
                        ) : (
                          <IconButton>
                            <HighlightOff style={{ color: "red" }} />
                          </IconButton>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Redes Sociais</Typography>
              <Box>
                <Avatar src={socialMedia.whatsapp} />
                <Avatar src={socialMedia.onlyfans} />
                <Avatar src={socialMedia.privacy} />
                <Avatar src={socialMedia.instagram} />
                <Avatar src={socialMedia.twitter} />
                <Avatar src={socialMedia.facebook} />
                <Avatar src={socialMedia.tiktok} />
                <Avatar src={socialMedia.telegram} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelProfile;
