import * as React from "react";
import Carousel from "../../components/Carousel";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {

  return (
    <Stack textAlign="center">
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Welcome to South Escorts
      </Typography>
      <Carousel />
    </Stack>
  );
}
