import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import ApplicationDashboard from "./pages/ApplicationsDashboard";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import CompanyDashboard from "./pages/CompanyDashboard";
import SearchNif from "./components/SearchNif";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster  />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<ApplicationDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/companies" element={<CompanyDashboard />} />
          <Route path="/searchNif" element={<SearchNif />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
