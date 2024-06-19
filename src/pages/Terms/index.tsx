import React, { useState } from "react";
import { Container, Tab, Tabs, Typography, Box } from "@mui/material";
import AdvertiserTerms from "./AdvertiserTerms";
import CustomerTerms from "./CustomerTerms";

const Terms: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "#FFFFA0", textTransform: "uppercase" }}
      >
        Termos de Uso e Serviços
      </Typography>
      <Typography variant="h4" component="h2">
        Você é anunciante ou contratante?
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Termos de Uso e Serviços"
        sx={{
          ".MuiTabs-indicator": {
            backgroundColor: "#FFFFA0",
          },
        }}
      >
        <Tab
          label="Anunciante"
          sx={{
            color: "#FFD770",
            "&.Mui-selected": {
              color: "#FFFFA0",
            },
          }}
        />
        <Tab
          label="Cliente"
          sx={{
            color: "#FFD770",
            "&.Mui-selected": {
              color: "#FFFFA0",
            },
          }}
        />
      </Tabs>
      <Box mt={3}>
        {selectedTab === 0 && <AdvertiserTerms />}
        {selectedTab === 1 && <CustomerTerms />}
      </Box>
    </Container>
  );
};

export default Terms;
