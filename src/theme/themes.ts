const lightTheme = {
  primary: '#3BBA7A',
  background: '#FFF',
  text: '#282828',
};

const darkTheme: Theme = {
  primary: '#3BBA7A',
  background: '#121212',
  text: '#FFF',
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
