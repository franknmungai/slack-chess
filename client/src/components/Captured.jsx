import React from 'react';
import '../App.css';
import getPieceImage from '../images/getPieceImages';

// * Simple component for showing captured pieces
const Captured = ({ pieces, color }) => {
	const colorPieces = pieces.filter((p) => p.player === color);

	return (
		<div className="captured__column">
			{colorPieces.map(({ player, captured }) => {
				const img = `${player}${captured.toUpperCase()}`; //wP for white pawn
				const key = Math.random().toString();

				return (
					<div key={key}>
						<img
							src={getPieceImage(img)}
							alt="captured"
							width={40}
							height={40}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Captured;
