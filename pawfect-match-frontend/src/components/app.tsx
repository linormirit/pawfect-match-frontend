import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./home/home-page";
import { PostsList } from "./posts/posts-list";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  defaultRadius: "md",
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <HomePage />
      <Router>
        <Routes>
          <Route path="/overview" element={<PostsList />}></Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export { App };
