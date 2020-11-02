import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#2279a0",
      main: "#2250a0",
      dark: "#272d4c",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ca585e",
      main: "#d81c26",
      dark: "#482426",
      contrastText: "#000",
    },
    openTitle: "#3f4771",
    type: "light",
  },
});

export default theme;
