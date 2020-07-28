import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/home.css'; //for some class names used by this component

// A p tag with a typewritter effect

const TypedText = (props) => {
	const textContent = useRef(Array.from(props.text));
	const [text, setText] = useState('');

	useEffect(() => {
		const timer = setInterval(() => {
			const lastCharIndex = text.length - 1;

			if (lastCharIndex === -1) {
				//text is empty
				setText(textContent.current[0]);
			} else if (lastCharIndex + 1 === textContent.current.length) {
				setText('');
			} else {
				setText((text) => text.concat(textContent.current[lastCharIndex + 1]));
			}
		}, 500);

		return () => clearInterval(timer);
	}, [text]);

	return <p className="m-1 type-writer">{text}|</p>;
};

TypedText.propTypes = {
	text: PropTypes.string.isRequired,
};

export default TypedText;
