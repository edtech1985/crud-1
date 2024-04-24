import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Girls from "../pages/Models/Girls";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../providers/AuthProvider";

export default function AppRouter() {

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/models", element: <Girls /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider isSignedIn={true}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
