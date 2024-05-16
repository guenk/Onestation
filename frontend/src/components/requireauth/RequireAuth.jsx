import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const location = useLocation();

	if (!isAuthenticated) {
		// Rediriger vers la page de connexion, mais mémoriser l'emplacement actuel
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
