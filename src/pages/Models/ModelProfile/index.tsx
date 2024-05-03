import React from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  CheckCircleOutline,
  HighlightOff,
  Telegram,
  X,
} from "@mui/icons-material";
import modelsData from "../../../db/models-details.json";
import BackButton from "../../../components/buttons/backButton";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Instagram from "@mui/icons-material/Instagram";
import Facebook from "@mui/icons-material/Facebook";
import ImageModelProfile from "../../../components/ImageModelProfile";

interface ModelProfileProps {
  name: string;
}

const ModelProfile: React.FC<ModelProfileProps> = () => {
  const { name: modelName } = useParams<{ name: string }>();

  const model = modelsData.find(
    (model: { name: string }) => model.name.toLowerCase() === modelName
  );

  if (!model) {
    return (
      <Typography>Detalhes sobre a acompanhante não encontrados.</Typography>
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
  } = model;

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
          <Typography variant="h4" component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Grid id="model-photos" item xs={12}>
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
          <Grid
            id="model-info"
            container
            spacing={2}
            justifyContent="center"
            mt={4}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="edtech">Informações 1</Typography>
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
                          <Tooltip title="Verificado" arrow>
                          <IconButton>
                            <CheckCircleOutline style={{ color: "green" }} />
                            </IconButton>
                          </Tooltip>
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
                <Stack direction="column" alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: "transparent", color: "green" }}>
                    <WhatsApp />
                  </Avatar>
                  <Avatar src="/img/only.png" sx={{ width: 36, height: 36 }} />
                  <Avatar
                    src="/img/privacy.png"
                    sx={{ width: 28, height: 28 }}
                  />
                  <Avatar sx={{ bgcolor: "transparent", color: "#c93a52" }}>
                    <Instagram />
                  </Avatar>
                  <Avatar sx={{ bgcolor: "transparent", color: "#fff" }}>
                    <X />
                  </Avatar>
                  <Avatar sx={{ bgcolor: "transparent", color: "blue" }}>
                    <Facebook />
                  </Avatar>
                  <Avatar
                    src="/img/tiktok.png"
                    sx={{ width: 34, height: 34 }}
                  />
                  <Avatar sx={{ bgcolor: "transparent", color: "#0b84ca" }}>
                    <Telegram />
                  </Avatar>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelProfile;
