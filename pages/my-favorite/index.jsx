import clsx from 'clsx';
import styles from './my-favorite.module.scss';
import { useEffect, useState } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';

export default function MyFavorite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		setSavedId(JSON.parse(localStorage.getItem('favorite')) || []);
	}, []);

	const result = useRecipesByIds(SavedId);
	console.log(result);

	return (
		<section className={clsx(styles.myFavorite)}>
			<h1>My favorite</h1>

			{result.map(({ data, isSuccess }) => {
				if (isSuccess) {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.favoriteCard)}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
							styleType={'horizontal'}
						/>
					);
				}
			})}
		</section>
	);
}
