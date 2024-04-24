import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Grid, Stack } from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { createSvgIcon } from "@mui/material/utils";

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

export default function Contact() {
  return (
    <>
      
      <Stack
        direction="row"
        spacing={2}
        mt={20}
        bgcolor="yellow"
        sx={{ margin: 10 }}
      >
        <Box bgcolor="aqua">
          <FormControl>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  sx={{ width: "100px" }}
                  id="user-id"
                  label="ID"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item>
                <TextField
                  // sx={{ width: "300px" }}
                  id="name"
                  label="Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  // sx={{ width: "300px" }}
                  id="nickname"
                  label="Nickname"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                />
                <PlusIcon />
                <DeleteRoundedIcon />
              </Grid>
            </Grid>
          </FormControl>
          
        </Box>
      </Stack>
    </>
  );
}
