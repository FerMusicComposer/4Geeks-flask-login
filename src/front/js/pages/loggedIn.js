import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const LoggedIn = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 className="display-2">Welcome Back!</h1>
		</div>
	);
};
