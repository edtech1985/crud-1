import React, { useState, useEffect } from "react";
import { Modal, Button, Box, Link, Typography } from "@mui/material";
import { ExitToApp, Lock } from "@mui/icons-material";

const AgeConfirmationModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isAdult = localStorage.getItem("isAdult");
    if (isAdult !== "true") {
      setOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("isAdult", "true");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    // Você pode redirecionar para outro lugar caso o usuário saia do modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        textAlign="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: 24,
          maxWidth: "90vw",
          TypographyAlign: "center",
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Confirmação de Maioridade
        </Typography>
        <Box my={4}>
          <Typography variant="body1" gutterBottom>
            Este site é destinado a<b> maiores de 18 anos</b>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Confirma que você é maior de idade?
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Lock />}
            onClick={handleConfirm}
            sx={{
              mr: 2,
              borderColor: "inherit",
              borderStyle: "solid",
              borderWidth: "2px",
              "&:hover": {
                borderColor: "green",
                borderStyle: "solid",
                borderWidth: "2px",
                color: "green",
                bgcolor: "black",
              },
            }}
          >
            Sim, sou maior
          </Button>
          <Button
            startIcon={<ExitToApp />}
            onClick={handleClose}
            sx={{
              bgcolor: "red",
              color: "white",
              borderColor: "red",
              borderStyle: "solid",
              borderWidth: "2px",
              "&:hover": {
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: "2px",
                color: "red",
              },
            }}
          >
            Sair
          </Button>
        </Box>
        <Box mt={2}>
          <Link
            href="/politica-de-privacidade"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade
          </Link>
          {" | "}
          <Link href="/termos-de-uso" target="_blank" rel="noopener noreferrer">
            Termos de Uso
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default AgeConfirmationModal;
