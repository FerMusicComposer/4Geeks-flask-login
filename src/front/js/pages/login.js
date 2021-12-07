import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let History = useHistory();

	const badLogin = {
		title: "Warning!",
		text: "The user or password entered are incorrect",
		icon: "warning",
		confirmButtonText: "close"
	};

	const logUserIn = async e => {
		e.preventDefault();
		if (email.trim().length === 0 || password.trim().length === 0) {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}

		const fetchOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		};

		const response = await fetch(`${process.env.BACKEND_URL}/api/login`, fetchOptions);
		if (response.ok) {
			const data = await response.json();
			actions.setUserSession(data.token, data.user_id);
			actions.setIsLoggedIn(true);
			History.push("/logged-in");
		} else {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
	};

	return (
		<div className="container  w-25">
			<form className="d-flex flex-column justify-content-center blue-box">
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<button className="btn btn-primary w-25 mx-auto mb-3" onClick={e => logUserIn(e)}>
					Login
				</button>
			</form>
		</div>
	);
};
