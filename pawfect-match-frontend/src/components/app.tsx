import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
});

const App: React.FC = () => {
  return <MantineProvider theme={theme}>
  </MantineProvider>;
};

export { App };
