import React from "react";
import { Grid } from "@mui/material";
import MassageCard from "../MassageCard";

const Gallery = ({ filters }: { filters: any }) => {
  const massageHouses = [
    // Exemplo de dados (substituir por dados reais)
    {
      id: 1,
      name: "Templo",
      city: "Cidade A",
      neighborhood: "Bairro X",
      imageUrl:
        "https://www.google.com/imgres?q=logo%20casa%20de%20massagens%20porto%20alegre&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100039505912723&imgrefurl=https%3A%2F%2Fm.facebook.com%2Ftemplodamassagem2013%2F&docid=T_txydYcPG7VQM&tbnid=6qd1OECaCwDVBM&vet=12ahUKEwibq_HI9byGAxXwqJUCHR5mBCMQM3oECBMQAA..i&w=2048&h=2048&hcb=2&ved=2ahUKEwibq_HI9byGAxXwqJUCHR5mBCMQM3oECBMQAA",
    },
    {
      id: 2,
      name: "Panteras Massagens",
      city: "Cidade B",
      neighborhood: "Bairro Y",
      imageUrl:
        "https://www.google.com/imgres?q=logo%20casa%20de%20massagens%20porto%20alegre&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100077108257942&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fp%2FPanteras-Massagens-Poa-100077108257942%2F%3Flocale%3Dpt_BR&docid=Uvi0RqA5CJFPFM&tbnid=CBz_7StaV1SK_M&vet=12ahUKEwibq_HI9byGAxXwqJUCHR5mBCMQM3oECGMQAA..i&w=470&h=470&hcb=2&ved=2ahUKEwibq_HI9byGAxXwqJUCHR5mBCMQM3oECGMQAA",
    },
    // Mais dados...
  ];

  const filteredHouses = massageHouses.filter(
    (house) =>
      (!filters.city || house.city.includes(filters.city)) &&
      (!filters.neighborhood ||
        house.neighborhood.includes(filters.neighborhood))
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
