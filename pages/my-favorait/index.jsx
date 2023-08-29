import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import styles from './favorait.module.scss';
import { useState, useEffect } from 'react';

function Favorait() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			setSavedId(JSON.parse(localStorage.getItem('savedRecipe')));
		} else {
			JSON.stringify(localStorage.setItem('savedRecipe', []));
		}
	}, []);

	useEffect(() => {
		console.log(SavedId);
	}, [SavedId]);

	return (
		<>
			<Head>
				<title>Favoraite Page</title>
			</Head>

			<section className={clsx(styles.favoraitePage)}>
				<Title type={'slogan'}>My Favoraite Recipe</Title>
			</section>
		</>
	);
}

export default Favorait;
