import { Routes, Route, Navigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import TheProject from "./pages/TheProject";
import Location from "./pages/Location";
import Developer from "./pages/Developer";

function About() {
  return (
    <Routes>
      <Route element={<AboutPage />}>
        <Route index element={<Navigate to="project" replace />} />
        <Route path="project" element={<TheProject />} />
        <Route path="location" element={<Location />} />
        <Route path="developer" element={<Developer />} />
      </Route>
    </Routes>
  );
}

export { AboutPage, TheProject, Location, Developer };
export default About;
