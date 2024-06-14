import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    edtech: React.CSSProperties;
    logo: React.CSSProperties;
    servivesSubtitle: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    edtech?: React.CSSProperties;
    logo?: React.CSSProperties;
    servicesSubtitle?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    edtech: true;
    logo: true;
    servicesSubtitle: true;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#C7B33B",
      light: "#FFFF90",
      dark: "#8D7B26",
      contrastText: "#60541E",
    },

    // error?: PaletteColorOptions;
    // warning?: PaletteColorOptions;
    // info?: PaletteColorOptions;
    // success?: PaletteColorOptions;
    // mode?: PaletteMode;
    // tonalOffset?: PaletteTonalOffset;
    // contrastThreshold?: number;
    // common?: Partial<CommonColors>;
    // grey?: ColorPartial;
    // text?: Partial<TypeText>;
    // divider?: string;
    // action?: Partial<TypeAction>;
    // background?: Partial<TypeBackground>;
    // getContrastText?: (background: string) => string;

    // ... other color configurations
    background: {
      paper: "#00fffff",
      default: "#000000",
    },
    action: {
      active: "#C7B33B",
      hover: "#FFFF90",
      selected: "#8D7B26",
      selectedOpacity: 0.8,
      disabled: "#60541E",
      disabledBackground: "#C7B33B",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h6: {
      fontFamily: "Fleur De Leah",
      color: "theme.vars.palette.primary.light",
    },
    h1: {
      fontFamily: "Fleur De Leah",
      color: "gold",
    },
    h2: {
      fontFamily: "Lora",
      color: "gold",
    },
    h3: {
      fontFamily: "Lora",
      color: "gold",
    },
    h4: {
      fontFamily: "Lora",
      color: "gold",
    },
    h5: {
      fontFamily: "Lora",
      color: "gold",
    },
    card: {
      fontFamily: "Lora",
      color: "gold",
    },
    body1: {
      fontFamily: "Lora",
      color: "gold",
    },
    button: {
      fontFamily: "Lora",
      color: "gold",
    },
    subtitle1: {
      fontFamily: "Fleur De Leah",
      color: "gold",
      fontSize: 42,
    },
    subtitle2: {
      fontFamily: "Lora",
      color: "#C7B33B",
      fontSize: 24,
    },
    servicesSubtitle: {
      fontFamily: "Lora",
      color: "#60541E",
      fontSize: 24,
    },
    edtech: {
      fontFamily: "Lora",
      color: "red",
    },
    logo: {
      fontFamily: "Fleur De Leah",
      color: "#C7B33B",
      fontSize: 36,
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          edtech: "h1",
          logo: "h2",
        },
      },
    },
  },

  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  // ... other theme configurations
});

export default theme;
