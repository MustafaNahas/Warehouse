import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import About from "./pages/About.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import AddProduct from "./pages/CreateProductPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import EditProduct from "./pages/EditProduct.tsx";


function App() {

    return (
      <BrowserRouter>
          <AuthProvider>
              <Navbar />
              <Routes>
                  <Route path="/About" element={<About />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
                  <Route path="/" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
                  <Route path="/AddProduct" element={<ProtectedRoute><AddProduct/></ProtectedRoute>} />
                  <Route path="/stock" element={<ProtectedRoute><ProductsPage/></ProtectedRoute>} />
                  <Route path="/products/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
