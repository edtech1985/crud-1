import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

const Filter = ({ onFilterChange }: { onFilterChange: (filter: { city: string, neighborhood: string }) => void }) => {
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ city, neighborhood });
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Bairro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
        >
          Filtrar
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
