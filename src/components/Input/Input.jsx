import { useState } from 'react';

function Input({ name, type, placeholder }) {
	const [value, setValue] = useState('');

	return (
		<input
			onChange={e => setValue(e.target.value)}
			{...{ name, type, placeholder, value }}
		/>
	);
}

export default Input;
