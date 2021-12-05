import Swal from "sweetalert2";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			access_token: null,
			user_id: null
		},
		actions: {
			setUserSession: (token, user_id) => {
				localStorage.setItem("access_token", token);
				localStorage.setItem("user_id", user_id);
				setStore({ access_token: token });
				setStore({ user_id: user_id });
			},
			deleteUserSession: () => {
				localStorage.removeItem("user_id");
				localStorage.removeItem("access_token");
				setStore({ user_id: null });
				setStore({ access_token: null });
			},
			notificationAlert: (title, text, icon, confirmButtonText) => {
				Swal.fire({
					title: title,
					text: text,
					icon: icon,
					confirmButtonText: confirmButtonText
				});
			}
		}
	};
};

export default getState;
