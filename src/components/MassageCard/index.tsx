import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const cardStyle = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const mediaStyle = {
  height: 200,
  filter: "brightness(70%)",
};

const contentStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: 2,
};

const MassageCard = ({ house }: { house: any }) => {
   const profileNameSlug = house.profile.name
     .replace(/\s+/g, "-")
     .toLowerCase();
  
  const citySlug = house.location.city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  
  const stateSlug = house.location.state
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return (
    <Card sx={cardStyle}>
      <Link
        to={`/casas-de-massagem/${stateSlug}/${citySlug}/${house.id}/${profileNameSlug}`}
        style={{ textDecoration: "none" }}
      >
        <CardActionArea>
          <CardMedia
            sx={mediaStyle}
            component="img"
            image={house.profile.logo}
            alt={`Imagem da Casa de Massagens: ${house.profile.name}`}
            aria-label={`Imagem da Casa de Massagens: ${house.profile.name}`}
          />
          <CardContent sx={contentStyle}>
            <Typography gutterBottom variant="h5">
              {house.profile.name}
            </Typography>
            <Typography variant="body2">
              {house.location.city}, {house.location.neighborhood}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default MassageCard;
