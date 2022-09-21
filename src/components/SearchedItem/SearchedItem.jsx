import React from 'react';
import styles from './SearchedItem.module.css';

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

function SearchedItem({ title, image, year, type }) {
	return (
		<div className={styles.around}>
			<div>
				<img src={image} className={styles['movie-image']} />
			</div>
			<div className={styles['movie-info-box']}>
				<span className={styles['movie-title']}>{title}</span>
				<div>
					<span>{year} - </span>
					<span>{capitalize(type)}</span>
				</div>
			</div>
		</div>
	);
}

export default SearchedItem;
