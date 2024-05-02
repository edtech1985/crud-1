import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Carousel from "../../components/Carousel";

export default function About() {
  return (
    <Box>
      <Carousel />
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h2" sx={{ marginBottom: "20px" }}>
          Sobre Nós
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
          turpis congue, vehicula libero nec, vestibulum ipsum. Nullam luctus
          ullamcorper magna at hendrerit. Proin nec risus quis nunc convallis
          ultricies. Vestibulum ac arcu vitae lorem vestibulum condimentum.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Sed ultricies enim nec felis posuere, sit amet ultricies velit
          lobortis. Nam viverra vestibulum tellus, eget consequat quam consequat
          et. Proin pretium fermentum massa, vel ultrices leo efficitur ac.
        </Typography>
        <Button variant="contained" color="primary" href="/models">
          Conheça Nossas Modelos
        </Button>
      </Box>
    </Box>
  );
}
