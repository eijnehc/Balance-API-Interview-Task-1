import { createGlobalStyle } from 'styled-components';

const ELEVATIONS = {
  medium: '2px 4px 8px hsl(var(--shadow-color) / 0.5)',
};

export const GlobalStyles = createGlobalStyle`
  :root {
    --shadow-color: 208deg 96% 57%;
    --primary-color-300: hsl(195deg 53% 79%);
    --primary-color-500: hsl(200deg 100% 64%);
    --primary-color-700: hsl(208deg 96% 57%);
    --primary-color-900: hsl(212deg 40% 20%);
    --shadow-elevation-medium: ${ELEVATIONS.medium};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 1.125rem;
  }

  body {
    background-color: hsl(0deg 0% 95%);
  }
`;
