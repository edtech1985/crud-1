// src/pages/Home.tsx
import * as React from "react";
import Carousel from "../../components/Carousel";
import {
  Box,
  Grid,
  Typography,
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
import { StyledMenuItem } from "../../components/StyledMenuItem";

const MenuItemStyles = {
  color: "primary.light",
  bgcolor: "black",
};

const MenuStyles = {
  color: "primary.light",
  bgcolor: "black",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    bottom: "-1px",
    left: "50%",
    backgroundColor: "currentColor",
    transition: "width 0.3s ease, left 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
    left: "0%",
  },
};

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
    }, 1000);

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
      <Box id="filter-box" textAlign="center" mt={2}>
        <Typography variant="h5">Selecione sua cidade:</Typography>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={city}
          label="Cidade"
          onChange={handleCityChange}
          displayEmpty
        >
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value=""
            disabled
          >
            <em>Selecione uma cidade</em>
          </StyledMenuItem>
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value="Porto Alegre"
          >
            Porto Alegre
          </StyledMenuItem>
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value="Florianópolis"
          >
            Florianópolis
          </StyledMenuItem>
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value="Curitiba"
          >
            Curitiba
          </StyledMenuItem>
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value="São Paulo"
          >
            São Paulo
          </StyledMenuItem>
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value="Rio de Janeiro"
          >
            Rio de Janeiro
          </StyledMenuItem>
          <StyledMenuItem
            sx={{
              ...MenuItemStyles,
              "&:hover": {
                bgcolor: "primary.light",
                color: "black",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
            value="Belo Horizonte"
          >
            Belo Horizonte
          </StyledMenuItem>
        </Select>
        <Button variant="contained" onClick={handleSearchClick}>
          Pesquisar
        </Button>
      </Box>
      <About city={city} />
    </>
  );
}
