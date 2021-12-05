import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container w-50 text-center mt-5">
			<h1>Landing Page</h1>
			<div className="d-flex flex-column justify-content-center blue-box">
				<h2 className="display-5">Still not registered?</h2>
				<Link className="btn btn-primary w-25 mx-auto mb-3 mt-5" to="/register">
					Register now!
				</Link>
			</div>
		</div>
	);
};
