import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import axios from 'axios';
import { useState } from 'react';

export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map(el => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	console.log(Selected);

	const handleClick = activeEl => {
		setSelected(activeEl);
		console.log(activeEl);
	};

	return (
		<section className={clsx(styles.findRecipe)}>
			<h1>Find Recipe</h1>
			<Category dataArr={Names} selected={Selected} onClick={handleClick} />
		</section>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');

	return {
		props: { categories: data.categories }
	};
}
