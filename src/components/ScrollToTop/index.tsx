import { Box, Fab, Fade, Tooltip } from "@mui/material";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

// === === === BEGIN SCROLL TO TOP === === === //
function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ zIndex: 9999 }}>
        {children}
      </Box>
    </Fade>
  );
}
// === === === END SCROLL TO TOP === === === //

export default function ScrollToTop() {
  return (
    <ScrollTop>
      <Tooltip title="Voltar ao topo" arrow>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9999,
            opacity: 0.4,
            transition: "opacity 0.5s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </ScrollTop>
  );
}
