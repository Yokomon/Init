import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4791db",
      main: "#1976d2",
      dark: "#115293",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ca585e",
      main: "#d81c26",
      dark: "#482426",
      contrastText: "#000",
    },
    openTitle: "#e67c7c",
    type: "light",
    tonalOffset: 0.2,
    contrastThreshold: 3,
  },
});

export default theme;
