import React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Link,
  Stack,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import logo from "../../assets/logo512.png"; // Importe a imagem do logo

const ContactPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  return (
    <Stack alignContent="center" alignItems="center" spacing={4}>
      {/* Informações de Contato */}
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">Informações de Contato</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <WhatsAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="WhatsApp"
              secondary={
                <Link href="https://wa.me/51992002599" target="_blank">
                  (51) 99200-2599
                </Link>
              }
              sx={{ color: "#60541E" }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Suporte"
              secondary={
                <Link href="mailto:suporte@southescorts.com">
                  suporte@southescorts.com
                </Link>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Comercial"
              secondary={
                <Link href="mailto:comercial@southescorts.com">
                  comercial@southescorts.com
                </Link>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Financeiro"
              secondary={
                <Link href="mailto:financeiro@southescorts.com">
                  financeiro@southescorts.com
                </Link>
              }
            />
          </ListItem>
        </List>
      </Stack>

      {/* Horário de Atendimento */}
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">Horário de Atendimento</Typography>
        <Typography>Segunda a Sexta-feira: 9h - 18h</Typography>
      </Stack>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{ width: isMobile ? "100px" : "150px" }}
      />
    </Stack>
  );
};

export default ContactPage;
