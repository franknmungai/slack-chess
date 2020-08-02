import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const useRequest = ({ route, body, method, onSuccess }) => {
	const url = BASE_URL + route;
	const doRequest = async () => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			}

			const resp = await axios[method](url, body);

			if (onSuccess) onSuccess(resp.data);

			return resp.data;
		} catch (error) {
			const { errors } = error.response?.data; //{ errors: [{ message: '' }] }
			return errors;
		}
	};

	return { doRequest };
};

export default useRequest;
