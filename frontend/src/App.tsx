
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import About  from "./pages/About";
import Products from "./components/ProductTable.tsx";

import DashboardPage from "./pages/DashboardPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./pages/Login.tsx";
import Settings from "./pages/Settings.tsx";

function App() {

    return (
      <BrowserRouter>
          <AuthProvider>
              <Navbar />
              <Routes>
                  <Route path="/Products" element={<Products />} />
                  <Route path="/about" element={<About  />} />
                  <Route path="/Login" element={<Login/>} />
                  <Route path="/DashboardPage" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
                  <Route path="/Settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
