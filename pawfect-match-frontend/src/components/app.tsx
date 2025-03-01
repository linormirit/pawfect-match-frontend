import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./home/home-page";
import { PostsList } from "./posts/posts-list";
import { SignUpForm } from "./home/sign-up-form";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  defaultRadius: "md",
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/overview" element={<PostsList />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export { App };
