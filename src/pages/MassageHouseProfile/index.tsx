import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DebitCardIcon from "@mui/icons-material/CreditCard"; // Usaremos o mesmo ícone para débito
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import QrCodeIcon from "@mui/icons-material/QrCode";
import VisaIcon from "@mui/icons-material/Payment"; // Substitua com ícones específicos do Visa/Mastercard se disponíveis
import MastercardIcon from "@mui/icons-material/Payment";
import Loading from "../../components/Loading";
import NewBreadcrumbs from "../../components/NewBreadcrumbs";

const MassageHouseProfile = ({ massageHouses }: { massageHouses: any[] }) => {
  const { id } = useParams();
  const [massageHouse, setMassageHouse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundMassageHouse = massageHouses.find((house) => house.id === id);
    setMassageHouse(foundMassageHouse);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id, massageHouses]);

  if (!massageHouse) {
    return (
      <Container>
        <Typography variant="servicesSubtitle" align="center" gutterBottom>
          Carregando...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      {loading && <Loading />}
      <NewBreadcrumbs
        firstPage={"Casas de Massagem"}
        pathToFirstPage={"/casas-de-massagem"}
        lastState={massageHouse.location.state}
        lastCity={massageHouse.location.city}
        currentPage={massageHouse.profile.name}
      />
      <Grid
        id="top-grid"
        container
        spacing={6}
        alignItems="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid item xs={12} md={4}>
          <img
            src={massageHouse.profile.logo}
            alt="Logo da Casa de Massagem"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Grid>
        <Grid id="profile" item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            {massageHouse.profile.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {massageHouse.profile.description}
          </Typography>
          <Typography>
            {massageHouse.location.city}, {massageHouse.location.state}
          </Typography>
        </Grid>
      </Grid>

      <Grid id="album" container spacing={2}>
        {massageHouse.album.map((photo: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={photo.image}
                alt={photo.description}
                style={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid id="services" container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="servicesSubtitle" gutterBottom>
            Serviços
          </Typography>
          {massageHouse.services.map((service: any, index: number) => (
            <Box key={index} pb={2}>
              <Typography variant="h5">{service.name}</Typography>
              <Typography>{service.description}</Typography>
              <Typography>Preço: {service.price}</Typography>
              <Typography>Duração: {service.duration}</Typography>
            </Box>
          ))}
        </Grid>

        <Grid id="payment-method" item xs={12} md={4}>
          <Typography variant="servicesSubtitle" gutterBottom>
            Formas de <br /> Pagamento
          </Typography>
          {massageHouse.payment.creditCard && (
            <Box display="flex" alignItems="center" mb={1}>
              <CreditCardIcon />
              <Typography variant="body1" ml={1}>
                Cartão de Crédito
              </Typography>
            </Box>
          )}
          {massageHouse.payment.creditCard && (
            <Box display="flex" alignItems="center" mb={1}>
              <VisaIcon />
              <Typography variant="body1" ml={1}>
                Visa
              </Typography>
            </Box>
          )}
          {massageHouse.payment.creditCard && (
            <Box display="flex" alignItems="center" mb={1}>
              <MastercardIcon />
              <Typography variant="body1" ml={1}>
                Mastercard
              </Typography>
            </Box>
          )}
          {massageHouse.payment.debitCard && (
            <Box display="flex" alignItems="center" mb={1}>
              <DebitCardIcon />
              <Typography variant="body1" ml={1}>
                Cartão de Débito
              </Typography>
            </Box>
          )}
          {massageHouse.payment.cash && (
            <Box display="flex" alignItems="center" mb={1}>
              <AttachMoneyIcon />
              <Typography variant="body1" ml={1}>
                Dinheiro
              </Typography>
            </Box>
          )}
          {massageHouse.payment.pix && (
            <Box display="flex" alignItems="center" mb={1}>
              <QrCodeIcon />
              <Typography variant="body1" ml={1}>
                Pix
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid id="location" item xs={12} md={4}>
          <Typography variant="servicesSubtitle" gutterBottom>
            Localização
          </Typography>
          <Typography>
            Rua: {massageHouse.location.street}, {massageHouse.location.number}
          </Typography>
          <Typography>
            Complemento: {massageHouse.location.complement}
          </Typography>
          <Typography>Bairro: {massageHouse.location.neighborhood}</Typography>
          <Typography>CEP: {massageHouse.location.zipCode}</Typography>
          <Typography>Cidade: {massageHouse.location.city}</Typography>
          <Typography>Estado: {massageHouse.location.state}</Typography>

          <Typography variant="servicesSubtitle" gutterBottom style={{ marginTop: 16 }}>
            Contato
          </Typography>
          <Typography>Telefone: {massageHouse.contact.phone}</Typography>
          <Typography>Email: {massageHouse.contact.email}</Typography>
          <Typography>Website: {massageHouse.contact.website}</Typography>
          <Typography>WhatsApp: {massageHouse.contact.whatsapp}</Typography>
          <Typography>Facebook: {massageHouse.contact.facebook}</Typography>
          <Typography>Instagram: {massageHouse.contact.instagram}</Typography>
          <Typography>Twitter: {massageHouse.contact.twitter}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MassageHouseProfile;
