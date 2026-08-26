import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </AuthProvider>
  );
}
