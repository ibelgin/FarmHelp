const lightTheme = {
  primary: '#3BBA7A',
  secondary: '#5FC592',
  background: '#FFF',
  text: '#3D3D3D',
  transparancy: '#F7F7F7',
  border: '#F2F2F2',
};

const darkTheme: Theme = {
  primary: '#3BBA7A',
  secondary: '#5FC592',
  background: '#121212',
  text: '#FFF',
  transparancy: '#D7D7D7',
  border: '#F2F2F2',
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
