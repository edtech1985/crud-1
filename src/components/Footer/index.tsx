import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import logo from "../../assets/logo512.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#ffd700",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Logo e nome da empresa */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
        </Link>

        {/* Redes Sociais */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <IconButton href="#" sx={{ color: "#ffd700" }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#ffd700" }}>
            <InstagramIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#ffd700" }}>
            <WhatsAppIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" sx={{ color: "#ffd700" }}>
        © {currentYear} South Escorts
      </Typography>

      {/* Desenvolvido por */}
      <Typography variant="body2" sx={{ color: "#ffd700" }}>
        Desenvolvido por{" "}
        <a
          href="https://edtech1985.com.br/projetos"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#ffd700", textDecoration: "none" }}
        >
          EdTech1985
        </a>
      </Typography>
    </Box>
  );
}
