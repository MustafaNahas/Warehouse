import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import About from "./pages/About.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";


function App() {

    return (
      <BrowserRouter>
          <AuthProvider>
              <Navbar />
              <Routes>
                  <Route path="/About" element={<About />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
                  <Route path="/" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
