import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import logo from "../../assets/logo512.png";

const Loading = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backdropFilter: "blur(10px)",
        zIndex: 1300, // Higher than other components
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box textAlign="center">
        <img src={logo} alt="Logo" width="300" height="300" />
        <Typography variant="h6" fontSize={40} color="primary.light" mb={2}>
          Carregando...
        </Typography>
        <CircularProgress color="primary" />
      </Box>
    </Box>
  );
};

export default Loading;
