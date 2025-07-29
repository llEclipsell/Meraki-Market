
import { Outlet, Navigate } from "react-router";

export default function PrivateRouting() {
    // This component is used to protect routes that require authentication
    // It checks if the user is authenticated and redirects to the login page if not

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // Else , If the user is authenticated, render the children components
    return <Outlet />;
}