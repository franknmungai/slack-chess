import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const request = ({ route, body, method, onSuccess }) => {
	const url = BASE_URL + route;
	const doRequest = async () => {
		try {
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

export default request;
