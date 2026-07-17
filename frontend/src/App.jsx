import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage    from "./pages/LandingPage";
import LoginPage      from "./pages/LoginPage";
import RegisterPage   from "./pages/RegisterPage";
import GeneratorPage  from "./pages/GeneratorPage";
import HistoryPage    from "./pages/HistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/app"
        element={
          <ProtectedRoute>
            <GeneratorPage />
          </ProtectedRoute>
        }
      />
      <Route path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      {/* Catch-all: redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}