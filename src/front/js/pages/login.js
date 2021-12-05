import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	let History = useHistory();
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	const badLogin = {
		title: "Warning!",
		text: "The user or password entered are incorrect",
		icon: "warning",
		confirmButtonText: "close"
	};

	const getLoginData = (attr, value) => {
		setLoginData(prev => {
			let logged_user = { ...prev };
			logged_user[attr] = value;

			return logged_user;
		});
	};

	const logUserIn = async (email, password) => {
		if (email === "" || password === "") {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
		const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
			method: "POST",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		if (response.ok) {
			let data = await response.json();
			actions.setUserSession(data.token, data.user_id);
			History.push("/logged-in");
		} else {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
	};
	const handleLogin = () => {
		logUserIn(loginData.email, loginData.password);
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
						onChange={e => getLoginData("email", e.target.value)}
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
						onChange={e => getLoginData("password", e.target.value)}
					/>
				</div>

				<button type="submit" className="btn btn-primary w-25 mx-auto mb-3" onClick={() => handleLogin()}>
					Login
				</button>
			</form>
		</div>
	);
};
