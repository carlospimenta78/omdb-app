import React, { useState } from 'react';

import SearchedItem from '../SearchedItem/SearchedItem';
import styles from './SearchBox.module.css';

const optionList = ['Movie', 'Series', 'Episode'];

function SearchBox() {
	const [name, setName] = useState('');

	const [year, setYear] = useState('');

	const [type, setType] = useState('');

	const [results, setResults] = useState(null);
	const [error, setError] = useState(null);

	const searchItems = async e => {
		e.preventDefault();

		let link = `https://www.omdbapi.com/?apikey=643a38c5&s=${name}`;

		if (!!type) {
			link += `&type=${type}`;
		}

		if (!!year) {
			link += `&y=${year}`;
		}

		const res = await fetch(link);

		const json = await res.json();

		console.log(json);

		if (!!json.Error) {
			setError(json.Error);
			setResults(null);
		} else {
			setError(null);
			setResults(json.Search);
		}
	};

	return (
		<>
			<header className={styles.header}>
				<img src='images/logo.png' className={styles.logo} />
				<form onSubmit={searchItems} className={styles['form-box']}>
					<fieldset className={styles['name-around']}>
						<div className={styles['name-icon']}></div>
						<input
							required
							type='text'
							placeholder='Title'
							value={name}
							onChange={e => setName(e.target.value)}
							className={styles['name-input']}
						/>
					</fieldset>
					<select
						className={styles['type-around']}
						value={type}
						onChange={e => setType(e.target.value)}
					>
						<option hidden value=''>
							Type
						</option>
						{optionList.map(e => (
							<option key={e} value={e.toLowerCase()}>
								{e}
							</option>
						))}
					</select>
					<fieldset className={styles['year-around']}>
						<div className={styles['year-icon']}></div>
						<input
							type='text'
							placeholder='Year'
							className={styles['year-input']}
							value={year}
							onChange={e => setYear(e.target.value)}
						/>
					</fieldset>
					<button type='submit'>Search</button>
				</form>
			</header>
			<main className={styles['around-items']}>
				{!!results &&
					results
						.filter(e => e.Poster !== 'N/A')
						.map(e => (
							<SearchedItem
								key={e.imdbID}
								title={e.Title}
								image={e.Poster}
								type={e.Type}
								year={e.Year}
							/>
						))}
				{!!error && <div>{error}</div>}
			</main>
		</>
	);
}

export default SearchBox;
