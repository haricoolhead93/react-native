import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: "#EAFDFF",
      100: "#BEEEF2",
      200: "#66b0b6",
      300: "#4da3aa",
      400: "#33959d",
      500: "#007b85",
      600: "#006f78",
      700: "#00626a",
      800: "#00565d",
      900: "#004a50",
      1000: "#797979",
      1050: "#F5FDFE",
    },
    gray: {
      50: "#ECECEC",
      100: "#ACACAC",
      200: "#1A1A1A1A",
      300: "#E1E1E1",
      400: "#E4E4E4",
    },
    red : {
      50 : "#E73A3A",
      100 : "#F04D0C"
    },
    yellow : {
      50: "#FFC241"
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "primary.500",
          _text: {
            color:"white"
          }
        },
        secondary: {
          bg: "danger.600",
          _text: {
            color:"white"
          }
        },
        icon: {
          bg: "white",
          _text: {
            color:"primary.500"
          }
        },
      },
    },
    Input: {
      baseStyle: {
        bg: "white",
      }
    }
  },
    
});

export default theme;