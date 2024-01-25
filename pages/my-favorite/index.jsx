import clsx from 'clsx';
import Card from '@/components/molecules/card/Card';
import styles from './my-favorite.module.scss';
// 동등한 구조의 스타일을 덮어쓰기 할 때, page 컴포넌트의 스타일이 가장 높은 우선순위를 가져야하기 때문에, import 구문에서 page 전용 스타일이 가장 최종적으로 연결되어야 함. (여기서는 ./my-favorite.module.scss)
// 위의 순서처럼 스타일 파일을 import 해야, Card 컴포넌트에 연결되어 있는 스타일이 먼저 적용되고, 그 뒤에 페이지 전용 스타일로 한 번 더 덮어쓰기가 됨.
import { useEffect, useState } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';

export default function MyFavorite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		setSavedId(JSON.parse(localStorage.getItem('favorite')) || []);
	}, []);

	const result = useRecipesByIds(SavedId);

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
