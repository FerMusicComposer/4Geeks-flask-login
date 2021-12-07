import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let History = useHistory();

	const badRegistry = {
		title: "Warning!",
		text: "The data you entered is either in the wrong format, or coulnd't be read by the server. Please try again",
		icon: "warning",
		confirmButtonText: "close"
	};

	const registerUser = async e => {
		e.preventDefault();
		if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
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
			History.push("/login");
		} else {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
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
						onChange={e => setName(e.target.value)}
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
						onChange={e => setEmail(e.target.value)}
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
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>

				<button className="btn btn-primary w-25 mx-auto mb-3" type="submit" onClick={e => registerUser(e)}>
					Register
				</button>
			</form>
		</div>
	);
};
