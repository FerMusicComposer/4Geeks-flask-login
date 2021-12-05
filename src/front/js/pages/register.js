import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory, Redirect } from "react-router";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [registryData, setRegistryData] = useState({ name: "", email: "", password: "" });
	const [redirect, setRedirect] = useState(false);
	let History = useHistory();

	const badRegistry = {
		title: "Warning!",
		text: "The data you entered is either in the wrong format, or coulnd't be read by the server. Please try again",
		icon: "warning",
		confirmButtonText: "close"
	};

	const getRegistryInfo = (attr, value) => {
		setRegistryData(prev => {
			let registered_user = { ...prev };
			registered_user[attr] = value;

			return registered_user;
		});
	};

	const registerUser = async (name, email, password) => {
		if (name === "" || email === "" || password === "") {
			actions.notificationAlert(
				badRegistry.title,
				badRegistry.text,
				badRegistry.icon,
				badRegistry.confirmButtonText
			);
		}

		const response = await fetch(`${process.env.BACKEND_URL}/api/create-user`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				name: name,
				email: email,
				password: password
			})
		});
		if (response.ok) {
			setRedirect(true);
			if (redirect) {
				<Redirect to="/login" />;
			}
		} else {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
	};

	const handleRegistry = () => {
		registerUser(registryData.name, registryData.email, registryData.password);
	};

	return (
		<div className="container  w-25">
			<form className="row g-3 d-flex flex-column justify-content-center blue-box">
				<div className="mb-3">
					<label htmlFor="validationDefault01" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="validationDefault01"
						placeholder="Name"
						onChange={e => getRegistryInfo("name", e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="example@email.com"
						onChange={e => getRegistryInfo("email", e.target.value)}
						required
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
						onChange={e => getRegistryInfo("password", e.target.value)}
						required
					/>
				</div>

				<button className="btn btn-primary w-25 mx-auto mb-3" type="submit" onClick={handleRegistry}>
					Register
				</button>
			</form>
		</div>
	);
};
