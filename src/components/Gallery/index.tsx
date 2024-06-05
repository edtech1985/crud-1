import React from "react";
import { Grid } from "@mui/material";
import MassageCard from "../MassageCard";
import massageHouseData from "../../db/massagesHouse.json";

const Gallery = ({ filters }: { filters: any }) => {
  const massageHouses = massageHouseData;

  const filteredHouses = massageHouses.filter(
    (house: any) =>
      (!filters.city || house.location.city.includes(filters.city)) &&
      (!filters.neighborhood ||
        house.location.neighborhood.includes(filters.neighborhood))
  );

  return (
    <Grid container spacing={3}>
      {filteredHouses.map((house) => (
        <Grid item xs={12} sm={6} md={4} key={house.id}>
          <MassageCard house={house} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Gallery;
