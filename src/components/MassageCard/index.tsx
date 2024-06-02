import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import useStyles from "../../theme/useStyles";

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

  return (
    <Card sx={cardStyle}>
      <CardActionArea>
        <CardMedia
          sx={mediaStyle}
          component="img"
          image={house.imageUrl}
          alt={house.name}
        />
        <CardContent sx={contentStyle}>
          <Typography gutterBottom variant="h5">
            {house.name}
          </Typography>
          <Typography variant="body2">
            {house.city}, {house.neighborhood}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MassageCard;
