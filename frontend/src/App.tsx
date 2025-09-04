
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";


function App() {

    return (
      <BrowserRouter>
          <AuthProvider>
              <Navbar />
              <Routes>

              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
