import { createTheme } from "@mui/material";
import { lime, purple } from "@mui/material/colors";


export const theme = createTheme({
  "palette": {
    "primary": {
      "main": "#5d64e6",
      "contrastText": "#f3f5fd"
    },
    "secondary": {
      "main": "#977ae0",
      "contrastText": "#f5f4fb"
    },
    "success": {
      "main": "#009843",
      "contrastText": "#ecf9ee"
    },
    "warning": {
      "main": "#da9600",
      "contrastText": "#211300"
    },
    "error": {
      "main": "#df2225",
      "contrastText": "#fff0ee"
    },
    "info": {
      "main": "#0081d0",
      "contrastText": "#eaf7ff"
    },
    "background": {
      "default": "#f9fafc",
      "paper": "#f0f2f5"
    },
    "text": {
      "primary": "#0a0f1a",
      "secondary": "#545861"
    },
    "divider": "#e0e3e8",
    "mode": "light"
  },
  "spacing": 8,
  "shape": {
    "borderRadius": 8
  }
});
