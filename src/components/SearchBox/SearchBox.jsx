import React, { useState } from 'react';

import SearchedItem from '../SearchedItem/SearchedItem';
import styles from './SearchBox.module.css';

const optionList = ['Movie', 'Serie', 'Episode'];

function SearchBox() {
	const [name, setName] = useState('');
	const [results, setResults] = useState(null);

	const searchItems = async e => {
		e.preventDefault();
		const res = await fetch(
			`https://www.omdbapi.com/?apikey=643a38c5&s=${name}`
		);
		const json = await res.json();

		console.log(json);
		setResults(json.Search);
	};

	return (
		<div>
			<form onSubmit={searchItems}>
				<fieldset>
					<label>Title : </label>
					<input
						type='text'
						placeholder='Title'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</fieldset>
				<fieldset>
					<label>Type : </label>
					<select>
						<option hidden value=''>
							Select an option
						</option>
						{optionList.map(e => (
							<option key={e} value={e}>
								{e}
							</option>
						))}
					</select>
				</fieldset>
				<fieldset>
					<label>Year : </label>
					<input type='text' placeholder='Year'></input>
				</fieldset>
				<button type='submit'>Search</button>
			</form>
			<div className={styles['around-items']}>
				{results !== null &&
					results.map(e => (
						<SearchedItem
							key={e.imdbID}
							title={e.Title}
							image={e.Poster}
							type={e.Type}
							year={e.Year}
						/>
					))}
			</div>
		</div>
	);
}

export default SearchBox;
