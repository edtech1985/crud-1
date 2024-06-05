
import { makeStyles, Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  media: {
    height: 200,
    filter: "brightness(70%)",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: theme.spacing(2),
  },
}));

export default useStyles;
