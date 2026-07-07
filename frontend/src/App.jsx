import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage      from "./pages/LoginPage";
import RegisterPage   from "./pages/RegisterPage";
import GeneratorPage  from "./pages/GeneratorPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/"
        element={
          <ProtectedRoute>
            <GeneratorPage />
          </ProtectedRoute>
        }
      />
      {/* Catch-all: redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}