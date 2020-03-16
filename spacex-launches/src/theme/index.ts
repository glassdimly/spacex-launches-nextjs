type MqFunc = (rules: string) => string;

interface Theme {
  colors: { [key: string]: string };
  units: { [key: string]: string };
  fonts: { [key: string]: string };
  fontFamily: string;
  maxWidth: string;
  border: string;
  borderRadius: string;
  mq: { [key: string]: MqFunc };
}

const theme = {
  colors: {
    primary: '#FFF',
    secondary: '#000',
    primaryDimmed: '#2c2c2c',
    primaryTrans: 'rgba(255, 255, 255, 0.85)',
    accent: '#13A2E8',
    primaryGradient: 'linear-gradient(180deg, #9db7cd 0%, #FFF 80%)',
    secondaryTrans: 'rgba(0, 0, 0, 0.1)',
  },

  units: {
    sm: '0.5rem',
    med: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },

  fonts: {
    sm: '0.92rem',
    med: '1rem',
    lg: '1.06rem',
  },

  mq: {
    // xxsm: cssRules => `@media screen and (min-width: 320px){${cssRules}}`,
    xsm: (cssRules: string): string => `@media screen and (min-width: 420px){${cssRules}}`,
    sm: (cssRules: string): string => `@media screen and (min-width: 600px){${cssRules}}`,
  },

  fontFamily: 'geomanist, Helvetica, sans-serif;',
  maxWidth: '960px',
  border: '1px solid #FFFFFF',
  borderRadius: '3px',
};

export default theme;
