import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./home/home-page";
import { Overview } from "./overview/overview";
import { SignUpForm } from "./home/sign-up-form";
import { UserProvider } from "../providers/user-provider";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  defaultRadius: "md",
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Router>
          <UserProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/overview" element={<Overview />} />
            </Routes>
          </UserProvider>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export { App };
