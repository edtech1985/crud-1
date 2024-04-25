import React, { useState } from "react";
import { Box, Typography, Grid, Link, Paper, Avatar } from "@mui/material";

import modelsData from "./models-details.json";
import ImageBox from "../../components/ImageBox";

export default function Models() {
  const [selectedModel, setSelectedModel] = useState<any>(null);

  const handleMouseEnter = (model: any) => {
    setSelectedModel(model);
  };

  const handleMouseLeave = () => {
    setSelectedModel(null);
  };

  return (
    <Box textAlign="center">
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12} mx={10}>
          <Typography variant="h4" component="h1" gutterBottom>
            Nossas Massagistas
          </Typography>
          <Typography variant="body1" paragraph>
            Nossos terapeutas e massagistas são dedicados exclusivamente a
            proporcionar o máximo de prazer e relaxamento ao público masculino.
            Na Casa Rosa, cada profissional é cuidadosamente selecionado e
            treinado para oferecer uma experiência única e personalizada. Nós
            nos esforçamos para criar um ambiente acolhedor e discreto, onde
            você possa escapar do estresse do dia a dia e se entregar aos
            cuidados especializados de nossos terapeutas.
          </Typography>
        </Grid>
        {modelsData.map((model) => (
          <Grid item key={model.id} xs={12} sm={6} md={4}>
            <Box
              bgcolor="blue"
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="center"
              onMouseEnter={() => handleMouseEnter(model)}
              onMouseLeave={handleMouseLeave}
              sx={{ marginBottom: 2 }}
            >
              <Link href={`/models/${model.name.toLowerCase()}`}>
                <ImageBox
                  src={model.profilePicture}
                  alt={model.name}
                  modelAvatar={model.avatar}
                />
              </Link>
              {selectedModel === model && (
                <Paper
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Informações de {model.name}:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Idade: {model.age}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Altura: {model.height}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Peso: {model.weight}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Cor dos olhos: {model.eyeColor}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Busto: {model.bust}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Cintura: {model.waist}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Quadril: {model.hips}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Pés: {model.feet}
                  </Typography>

                  <Avatar
                    alt={model.name}
                    src={model.avatar}
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      width: 40,
                      height: 40,
                    }}
                  />
                </Paper>
              )}
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  position: "absolute",
                  bottom: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  textShadow: "1px 2px 2px black",
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
