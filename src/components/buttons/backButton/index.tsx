import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton = () => {
  const navigate = useNavigate();
  const isSmallerThan480 = useMediaQuery("(max-width:479px)");

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AiOutlineArrowLeft />}
      onClick={handleClick}
      sx={{
        position: "absolute",
        borderRadius: "50%",
        left: "8px", // ajuste conforme necessário
        top: "8px", // ajuste conforme necessário
        visibility: isSmallerThan480 ? "hidden" : "visible",
      }}
    >
      Voltar
    </Button>
  );
};

export default BackButton;
