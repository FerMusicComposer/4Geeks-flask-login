import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container  w-25">
			<form className="row g-3 d-flex flex-column justify-content-center blue-box">
				<div className="mb-3">
					<label htmlFor="validationDefault01" className="form-label">
						Name
					</label>
					<input type="text" className="form-control" id="validationDefault01" value="Mark" required />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>

				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>

				<button className="btn btn-primary w-25 mx-auto mb-3" type="submit">
					Register
				</button>
			</form>
		</div>
	);
};
