import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	let History = useHistory();

	const logOut = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("user_id");
		actions.setIsLoggedIn(false);

		History.push("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Landing Page</span>
				</Link>
				<div className="ml-auto">
					{store.isLoggedIn ? (
						<button className="btn btn-primary" onClick={logOut}>
							log out
						</button>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">login</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
