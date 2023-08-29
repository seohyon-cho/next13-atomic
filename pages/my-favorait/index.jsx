import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import styles from './favorait.module.scss';
import { useState, useEffect } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';
import Card from '@/components/molecules/Card/Card';

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

	//복수개의 쿼리 요청 결과값을 반환하는 커스텀 훅 호출
	const result = useRecipesByIds(SavedId);
	console.log(result);

	return (
		<>
			<Head>
				<title>Favoraite Page</title>
			</Head>

			<section className={clsx(styles.favoraitePage)}>
				<Title type={'slogan'}>My Favoraite Recipe</Title>
				{result &&
					result.map(({ data, isSuccess }) => {
						if (isSuccess) {
							return (
								<Card
									key={data.idMeal}
									imgSrc={data.strMealThumb}
									url={`/find-recipe/${data.idMeal}`}
									txt={`${data.strMeal}`}
									className={clsx(styles.card)}
								/>
							);
						}
					})}
			</section>
		</>
	);
}

export default Favorait;
