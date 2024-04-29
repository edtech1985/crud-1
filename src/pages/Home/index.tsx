import * as React from "react";
import Carousel from "../../components/Carousel";
import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Grid container spacing={2} alignItems="center" px={4}>
      <Grid item xs={2}>
        {/* Banner lateral esquerdo */}
        <Box bgcolor="primary.main" height="400px" width="100%">
          {/* Conteúdo do banner */}
          <Typography color="black" sx={{ marginTop: "20px" }}>
            Premium
            <br />
            Anuncie aqui
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        {/* Carrossel */}
        <Box textAlign="center">
          <Typography variant="h2" sx={{ marginBottom: "20px" }}>
            Welcome to South Escorts
          </Typography>
          <Carousel />
        </Box>
      </Grid>
      <Grid item xs={2}>
        {/* Banner lateral direito */}
        <Box bgcolor="secondary.main" height="400px" width="100%">
          {/* Conteúdo do banner */}
          <Typography color="black" sx={{ marginTop: "20px" }}>
            Premium
            <br />
            Anuncie aqui
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
