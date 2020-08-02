import request from '../../functions/request';
export const saveGame = async (data) => {
	// Save to ls
	const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
	const newSavedGames = savedGames.concat(data.gameID);
	localStorage.setItem('savedGames', JSON.stringify(newSavedGames));

	// Save to database
	const { doRequest } = request({
		route: '/api/game',
		method: 'post',
		body: data,
		onSuccess: () => {},
	});

	try {
		await doRequest();
	} catch (error) {
		return error;
	}
};
