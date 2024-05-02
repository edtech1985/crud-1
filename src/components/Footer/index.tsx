import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

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
      {/* Redes Sociais */}
      <Box>
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
