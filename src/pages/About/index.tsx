// src/pages/About.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Carousel from "../../components/Carousel";
import { useNavigate } from "react-router-dom";

interface AboutProps {
  city: string | null; // Recebe a cidade selecionada
}

const About: React.FC<AboutProps> = ({ city }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (city) {
      navigate(`/acompanhantes?city=${encodeURIComponent(city)}`);
    } else {
      navigate("/acompanhantes");
    }
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h2" sx={{ marginBottom: "20px" }}>
          Sobre Nós
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Seja parte da revolução da indústria adulta! No South Escorts, estamos
          moldando o futuro com inovação e tecnologia de ponta. Nossa missão é
          clara: ser a referência no Brasil e no mundo, oferecendo uma
          plataforma interativa onde a conexão entre usuários e anunciantes
          alcança novos patamares de excelência.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Anuncie conosco e aproveite uma audiência global sedenta por
          novidades. Não fique de fora desta oportunidade única de expandir seu
          alcance e aumentar sua influência. Divulgue suas redes sociais como
          OnlyFans e Privacy e potencialize seu impacto como nunca antes.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Conheça Nossas Modelos
        </Button>
      </Box>
      <Carousel />
    </Box>
  );
};

export default About;
