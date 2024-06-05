import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, MenuItem, Box } from "@mui/material";
import Loading from "../Loading";

interface FilterProps {
  onFilterChange: (filter: { city: string; neighborhood: string }) => void;
  massageHouses: any[]; // Dados das casas de massagem
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, massageHouses }) => {
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extrair cidades únicas dos dados das casas de massagem
    const uniqueCities = [
      "Selecione uma cidade",
      ...Array.from(new Set(massageHouses.map((house) => house.location.city))),
    ];
    setCities(uniqueCities);
  }, [massageHouses]);

  useEffect(() => {
    // Extrair bairros únicos dos dados das casas de massagem
    if (city && city !== "Selecione uma cidade") {
      const filteredNeighborhoods = massageHouses
        .filter((house) => house.location.city === city)
        .map((house) => house.location.neighborhood);
      setNeighborhoods(Array.from(new Set(filteredNeighborhoods)));
    } else {
      setNeighborhoods([]);
    }
  }, [city, massageHouses]);

  const handleFilterChange = () => {
    setLoading(true);
    setTimeout(() => {
      onFilterChange({ city, neighborhood });
      setLoading(false);
    }, 1000); // Simulando o tempo de carregamento
  };

  const handleClearFilters = () => {
    setLoading(true);
    setTimeout(() => {
      setCity("");
      setNeighborhood("");
      onFilterChange({ city: "", neighborhood: "" });
      setLoading(false);
    }, 1000); // Simulando o tempo de carregamento
  };

  const MenuItemStyles = {
    bgcolor: "black",
    color: "gold",
    "&.Mui-selected": {
      bgcolor: "primary.main",
      color: "white",
    },
    "&.Mui-selected:hover": {
      bgcolor: "primary.light",
      color: "black",
    },
  };

  return (
    <Box position="relative" pb={3}>
      {loading && <Loading />}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Cidade"
            value={city}
            onChange={(e) => {
              setCity(e.target.value as string);
              setNeighborhood("");
            }}
            sx={{
              "& .MuiSelect-select": {
                color: "gold", // Cor do texto do item selecionado
                bgcolor: "black", // Fundo do item selecionado
              },
            }}
          >
            {cities.map((cityOption) => (
              <MenuItem key={cityOption} value={cityOption} sx={MenuItemStyles}>
                {cityOption}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Bairro"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value as string)}
            disabled={!city || city === "Selecione uma cidade"}
            sx={{
              "& .MuiSelect-select": {
                color: "gold", // Cor do texto do item selecionado
                bgcolor: "black", // Fundo do item selecionado
              },
            }}
          >
            {!city && <MenuItem value="Selecione uma cidade"></MenuItem>}
            {neighborhoods.map((neighborhoodOption) => (
              <MenuItem
                key={neighborhoodOption}
                value={neighborhoodOption}
                sx={MenuItemStyles}
              >
                {neighborhoodOption}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleFilterChange}
            disabled={loading}
          >
            Filtrar
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            disabled={loading}
          >
            Limpar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
