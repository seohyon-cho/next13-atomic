import clsx from 'clsx';
import axios from 'axios';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import { useState } from 'react';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';

export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map(el => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);

	// 선택한 카테고리명인 Selected 를 인수로 넣음.
	const { data: dataByCategory, isSuccess } = useRecipeByCategory(Selected, '');
	console.log(dataByCategory);

	const handleClick = activeEl => {
		setSelected(activeEl);
	};

	return (
		<section className={clsx(styles.findRecipe)}>
			<h1>Find Recipe</h1>
			<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
			<h2>{Selected}</h2>
			{isSuccess &&
				dataByCategory.map(data => {
					return <Card key={data.idMeal} imgSrc={data.strMealThumb} txt={data.strMeal} className={clsx(styles.foodItem)} />;
				})}
		</section>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get(`/categories.php`);
	return {
		props: { categories: data.categories }
	};
}
