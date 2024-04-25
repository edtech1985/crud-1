import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h6: {
      fontFamily: "Fleur De Leah",
      color: 'gold'
    },
    h1: {
      fontFamily: "Fleur De Leah",
      color: 'gold'
    },
    h2: {
      fontFamily: "Lora",
      color: 'gold'
    },
  },
  palette: {
    // ... outras configurações de cores
    background: {
      paper: "#fff" ,
      default: "#f5f5f5", // Cor de fundo padrão (opcional)
    },
  },
  // ... outras configurações de tema
});

// Add this CSS to your main CSS file
const fontFaceStyles = `
  @font-face {
    font-family: 'Fleur De Leah';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/FleurDeLeah.woff2') format('woff2'),
         url('/fonts/FleurDeLeah.woff') format('woff');
  }
`;

export default theme;
