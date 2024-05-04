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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ContactPage = () => {
  return (
    <Stack alignContent="center" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Contato
      </Typography>
      <Divider variant="middle" />

      <Typography variant="h5" gutterBottom>
        Horário de Atendimento
      </Typography>
      <Typography>Segunda a Sexta-feira: 9h - 18h</Typography>

      <Divider variant="middle" />

      <Typography variant="h5" gutterBottom>
        Informações de Contato
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <List>
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ border: "solid 2px #8D7B26", color: "#60541E" }}
        >
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
          </List>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ContactPage;
