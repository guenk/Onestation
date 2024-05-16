import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/navbarpic2.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authActions";
import { Tooltip } from "react-tooltip";

import "./style.scss";

const navigation = [
	{ name: "Rejoindre une partie", to: "/" },
	{ name: "Créer une partie", to: "/" },
	{ name: "Règles du jeu", to: "/rules" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			dispatch(logout());
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	const avatarFileName = user?.avatar?.split("/").pop();

	return (
		<Disclosure as="nav">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl py-5 sm:px-6 lg:px-8 NavBar">
						<div className="relative flex items-center">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden pl-5">
								{/* Mobile menu button */}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black-400 pl-5">
									<span className="absolute -inset-0.5" />
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:justify-evenly">
								<div className="flex flex-shrink-0 items-center">
									<img
										className="h-24 w-auto"
										src={logo}
										alt="guess my draw logo"
									/>
								</div>
								<div className="hidden sm:ml-6 sm:block flex flex-col">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.to}
												className="hover:underline hover:text-[#0B8DFD] hover:font-bold"
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>

								{isAuthenticated ? (
									<div className="absolute inset-y-0 right-0 flex flex-col md:flex-row items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
										{user && (
											<Link to={`/profil/${user.id_gamer}`}>
												<div
													className="flex items-center gap-2"
													data-tip
													data-tooltip-id="tooltip-profil"
													data-tooltip-content="Voir mon profil"
												>
													<img
														className="h-8 w-8 rounded-full"
														src={`${
															import.meta.env.VITE_BACKEND_URL
														}/static/${avatarFileName}`}
														alt="Description de l'image"
													/>
													<p>
														<strong>{user.pseudo}</strong>
													</p>
													<Tooltip id="tooltip-profil" effect="solid"></Tooltip>
												</div>
											</Link>
										)}
										<button
											onClick={handleLogout}
											className="font-bold authButton"
										>
											Déconnexion
										</button>
									</div>
								) : (
									<div className="absolute inset-y-0 right-0 flex flex-col md:flex-row items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
										<Link to="/login">
											<button className="font-bold authButton">
												Se connecter
											</button>
										</Link>
										<Link to="/register">
											<button className="font-bold authButton">
												S'inscrire
											</button>
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as={Link} // Use Link for mobile menu items as well
									to={item.to}
									className={classNames(
										item.current ? "bg-black-900 text-white" : "text-black-300",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
