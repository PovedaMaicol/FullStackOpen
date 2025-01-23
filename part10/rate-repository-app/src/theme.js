// en la plataforma android usar roboto y en la plataforma ios use la fuente arial, la fuente predeterminada puede ser system

import { Platform } from "react-native";

const theme = {

  text: {
    color: Platform.select({
      android: 'green',
      ios: 'blue',
      default: 'black',
    }),
  },

    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'roboto',
        ios: 'arial',
        default: 'System',
      }),
    },
    
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;