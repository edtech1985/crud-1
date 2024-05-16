import * as React from "react";
import Carousel from "../../components/Carousel";
import { Box, Grid, Typography } from "@mui/material";
import Loading from "../../components/Loading";

export default function Home() {
  const [loading, setLoading] = React.useState(true); // Novo estado de carregamento

  React.useEffect(() => {
    
    // Simula o carregamento por 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading && <Loading />}
      <Grid container spacing={2} alignItems="center" px={1} pt={2} pb={4}>
        <Grid item xs={2}>
          {/* Banner lateral esquerdo */}
          <Box
            id="banner_esquerda"
            bgcolor="primary.main"
            height="400px"
            width="100%"
          >
            {/* Conteúdo do banner */}
            <Typography color="black">
              Premium
              <br />
              Anuncie aqui
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {/* Carrossel */}
          <Box textAlign="center">
            <Typography variant="h2" sx={{ marginBottom: "0px" }}>
              Welcome to South Escorts
            </Typography>
            <Carousel />
          </Box>
        </Grid>
        <Grid item xs={2}>
          {/* Banner lateral direito */}
          <Box
            id="banner_direita"
            bgcolor="secondary.main"
            height="400px"
            width="100%"
          >
            {/* Conteúdo do banner */}
            <Typography color="black">
              Premium
              <br />
              Anuncie aqui
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
