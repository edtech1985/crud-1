import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

function formatCityName(cityName: string) {
  let estado = cityName.slice(-2); // Captura as duas últimas letras da string
  let baseUrl = cityName.slice(0, -3).replace(/-/g, " "); // Remove os últimos três caracteres e substitui "-" por espaço
  return { baseUrl, estado };
}

export function IconBreadcrumbs({ cityURL }: { cityURL: string }) {
  const { baseUrl, estado } = formatCityName(cityURL);

  return (
    <div role="presentation" onClick={handleClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "gold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Acompanhantes
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "gold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {estado.toLocaleUpperCase()}
          </Link>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
            color="red"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {baseUrl}
          </Typography>
        </Breadcrumbs>
      </Box>
    </div>
  );
}
