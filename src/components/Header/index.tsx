import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import logo from "../../assets/logo512.png";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Acompanhantes", path: "/acompanhantes" },
  {
    label: "Cidades",
    submenu: [
      {
        label: "Porto Alegre-RS",
        path: "/cidades/acompanhantes-porto-alegre-rs",
      },
      {
        label: "Florianópolis-SC",
        path: "/cidades/acompanhantes-florianopolis-sc",
      },
      {
        label: "São Paulo-SP",
        path: "/cidades/acompanhantes-sao-paulo-sp",
      },
      {
        label: "Belo Horizonte-MG",
        path: "/cidades/acompanhantes-belo-horizonte-mg",
      },
      {
        label: "Rio de Janeiro-RJ",
        path: "/cidades/acompanhantes-rio-de-janeiro-rj",
      },
      {
        label: "Curitiba-PR",
        path: "/cidades/acompanhantes-curitiba-pr",
      },
    ],
  },
  { label: "Massagens", path: "/casas-de-massagem" },
  { label: "Favoritos", path: "/favoritos" },
  { label: "Contato", path: "/contato" },
  { label: "Anuncie", path: "/anuncie" },
];

const MenuItemStyles = {
  bgcolor: "black",
  color: "primary.light",
};

const MenuStyles = {
  color: "primary.light",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px", // altura da linha
    bottom: "-1px", // espaço abaixo da palavra
    left: "50%",
    backgroundColor: "currentColor", // cor da linha
    transition: "width 0.3s ease, left 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
    left: "0%",
  },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSubmenuAnchorEl(event.currentTarget);
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const renderNavItems = () => {
    return navItems.map((item) => (
      <ListItem key={item.label} disablePadding>
        {item.submenu ? (
          <>
            <ListItemButton
              onClick={handleSubmenuClick}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
            <Menu
              anchorEl={submenuAnchorEl}
              open={Boolean(submenuAnchorEl)}
              onClose={handleMenuClose}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                bgcolor: "black",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              {item.submenu.map((subItem) => (
                <MenuItem
                  key={subItem.label}
                  component={Link}
                  to={subItem.path}
                  onClick={handleMenuClose}
                  sx={{
                    ...MenuItemStyles,
                    "&:hover": {
                      bgcolor: "primary.light",
                      color: "black",
                    },
                    width: "100vw",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {subItem.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <ListItemButton
            component={Link}
            to={item.path}
            selected={window.location.pathname === item.path}
            sx={{ textAlign: "center", "&:selected": { color: "red" } }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        )}
      </ListItem>
    ));
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        ...MenuItemStyles,
        textAlign: "center",
        height: "100vh",
        paddingTop: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img
            src={logo}
            alt="Logo Luxury Escorts silhueta de mulher em dourado"
            style={{ width: "80%", marginBottom: "20px" }}
          />
        </Link>
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="fechar menu"
          sx={{ color: "white", position: "absolute", top: 15, left: 15 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>{renderNavItems()}</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#000000", color: "gold" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="logo"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", marginRight: "10px" }}
              />
              <Typography variant="h6" noWrap>
                South Escorts
              </Typography>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <React.Fragment key={item.label}>
                {item.submenu ? (
                  <>
                    <Button
                      aria-controls="city-menu"
                      aria-haspopup="true"
                      onClick={handleMenuClick}
                      sx={{
                        color: "primary.light",
                        position: "relative",
                        overflow: "hidden",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "0%",
                          height: "2px", // altura da linha
                          bottom: "-1px", // espaço abaixo da palavra
                          left: "50%",
                          backgroundColor: "currentColor", // cor da linha
                          transition: "width 0.3s ease, left 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                          left: "0%",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                    <Menu
                      id="city-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {item.submenu.map((subItem) => (
                        <MenuItem
                          key={subItem.label}
                          component={Link}
                          to={subItem.path} // URL da cidade selecionada
                          onClick={handleMenuClose}
                          sx={{
                            ...MenuItemStyles,
                            ...MenuStyles,
                            "&:hover": {
                              bgcolor: "primary.light",
                              color: "black",
                            },
                          }}
                        >
                          {subItem.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{ ...MenuStyles, color: "primary.light" }}
                  >
                    {item.label}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "full",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
