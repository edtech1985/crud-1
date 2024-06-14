// src/pages/Home.tsx
import * as React from "react";
import Carousel from "../../components/Carousel";
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Loading from "../../components/Loading";
import About from "../About";
import { CityContext } from "../../context/CityContext";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const { city, setCity } = React.useContext(CityContext);
  const navigate = useNavigate();

  const cityToStateMap: { [key: string]: string } = {
    "Porto Alegre": "RS",
    Florianópolis: "SC",
    Curitiba: "PR",
    "São Paulo": "SP",
    "Rio de Janeiro": "RJ",
    "Belo Horizonte": "MG",
  };

  React.useEffect(() => {
    // Simula o carregamento por 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setCity(event.target.value);
  };

  const handleSearchClick = () => {
    if (city) {
      navigate(`/acompanhantes?city=${encodeURIComponent(city)}`);
    } else {
      // handle no city selected
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 2, color: "red" }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {city && (
          <>
            <Typography color="red">
              {cityToStateMap[city]} : {city}
            </Typography>
          </>
        )}
      </Breadcrumbs>
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
      <Box textAlign="center" mt={2}>
        <Typography variant="h6">Selecione sua cidade:</Typography>
        <Select value={city} onChange={handleCityChange} displayEmpty>
          <MenuItem value="">
            <em>Nenhuma</em>
          </MenuItem>
          <MenuItem value="Porto Alegre">Porto Alegre</MenuItem>
          <MenuItem value="Florianópolis">Florianópolis</MenuItem>
          <MenuItem value="Curitiba">Curitiba</MenuItem>
          <MenuItem value="São Paulo">São Paulo</MenuItem>
          <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
          <MenuItem value="Belo Horizonte">Belo Horizonte</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleSearchClick}>
          Pesquisar
        </Button>
      </Box>
      <About city={city} />
    </>
  );
}
