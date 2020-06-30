import bB from '../images/bB.png';
import bK from '../images/bK.png';
import bN from '../images/bN.png';
import bP from '../images/bP.png';
import bQ from '../images/bQ.png';
import bR from '../images/bR.png';
import wB from '../images/wB.png';
import wK from '../images/wK.png';
import wN from '../images/wN.png';
import wP from '../images/wP.png';
import wQ from '../images/wQ.png';
import wR from '../images/wR.png';

const getPieceImage = (name) => {
	switch (name) {
		case 'bB':
			return bB;
		case 'bK':
			return bK;
		case 'bN':
			return bN;
		case 'bP':
			return bP;
		case 'bQ':
			return bQ;
		case 'bR':
			return bR;
		case 'wB':
			return wB;
		case 'wK':
			return wK;
		case 'wN':
			return wN;
		case 'wP':
			return wP;
		case 'wQ':
			return wQ;
		case 'wR':
			return wR;
		default:
			return '';
	}
};

export default getPieceImage;
