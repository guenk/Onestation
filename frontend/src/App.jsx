import { useSelector } from "react-redux"; // Déjà importé
import RequireAuth from "./components/requireauth/RequireAuth.jsx";
import { Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Profil from "./pages/profil/Profil";
import UpdateProfil from "./components/updateProfil/updateProfil";
import Rules from "./pages/rules/rules.jsx";
import Home from "./pages/home.jsx";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/rules" element={<Rules />} />
					<Route path="/" element={<Home />} />
					<Route
						path="/profil/:id"
						element={
							<RequireAuth>
								<Profil />
							</RequireAuth>
						}
					/>
					<Route
						path="/profil/modification/:id"
						element={
							<RequireAuth>
								<UpdateProfil />
							</RequireAuth>
						}
					/>
				</Routes>
			</PersistGate>
		</Provider>
	);
}

export default App;