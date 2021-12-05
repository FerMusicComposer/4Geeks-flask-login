import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const badLogin = {
		title: "Atención",
		text: "El usuario o contraseña ingresados son incorrectos",
		icon: "warning",
		confirmButtonText: "cerrar"
	};

	const getLoginData = (attr, value) => {
		console.log("loginData", attr, value);
		setLoginData(prev => {
			let logged_user = { ...prev };
			logged_user[attr] = value;

			return logged_user;
		});
	};

	console.log(loginData);
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

				<button type="submit" className="btn btn-primary w-25 mx-auto" onClick={() => handleLogin()}>
					Login
				</button>
			</form>
		</div>
	);
};
