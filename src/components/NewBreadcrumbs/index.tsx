import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

interface NewBreadcrumbsProps {
  firstPage: string;
  pathToFirstPage: string;
  lastState?: string;
  lastCity?: string;
  currentPage: string;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function NewBreadcrumbs(props: NewBreadcrumbsProps) {
  return (
    <Container role="presentation" onClick={handleClick} sx={{ pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" sx={{ color: "gold" }} />
          }
          aria-label="breadcrumb"
        >
          <Link
            to={props.pathToFirstPage}
            style={{
              textDecoration: "none",
              color: "gold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {props.firstPage}
          </Link>
          {props.lastState && (
            <Link
              to={`/${props.lastState}`}
              style={{
                textDecoration: "none",
                color: "gold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {props.lastState.toUpperCase()}
            </Link>
          )}
          {props.lastCity && (
            <Link
              to={`/${props.lastState}/${props.lastCity}`}
              style={{
                textDecoration: "none",
                color: "gold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationOnIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {props.lastCity}
            </Link>
          )}
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
            color="red"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {props.currentPage}
          </Typography>
        </Breadcrumbs>
      </Box>
    </Container>
  );
}
