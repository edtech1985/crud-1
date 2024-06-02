import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import Filter from "../../components/Filters"
import Gallery from "../../components/Gallery";

const Massage = () => {
  const [filters, setFilters] = useState({ city: "", neighborhood: "" });

  const handleFilterChange = (newFilters: { city: string, neighborhood: string }) => {
    setFilters(newFilters);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Casas de Massagem
      </Typography>
      <Filter onFilterChange={handleFilterChange} />
      <Gallery filters={filters} />
    </Container>
  );
};

export default Massage;
