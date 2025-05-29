import axios from "axios";

const BASE_URL = process.env.API_URL || "http://192.168.8.185:3001";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: 20_000,
});

export const setAuthToken = (token: string | null) => {
	if (!token) {
		api.defaults.headers.common["Authorization"] = undefined;
		return;
	}
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			setAuthToken(null);
		}

		return Promise.reject(error);
	},
);

export default api;
