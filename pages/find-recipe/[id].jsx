import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';

export default function Detail() {
	const [TableData, setTableData] = useState([]);

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(data);

	/*
	[
		{ name: 'ingredient', ingredient: '재료명', measure: '측량' },
		{ name: 'ingredient', ingredient: '재료명', measure: '측량' },
		{ name: 'ingredient', ingredient: '재료명', measure: '측량' }
	];
	*/

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			// strIngredient로 시작하는 key값만 뽑아내기
			keys = keys.filter(key => key.startsWith('strIngredient'));
			// 뽑아낸 key값 중, value값이 빈 문자 또는 null이 아닌 (value값이 비어있지 않은) key값만 다시 뽑아내기
			keys = keys.filter(key => data[key] !== '' && data[key] !== null);

			const ingredients = keys.map((key, idx) => {
				// 객체 형식으로 내보내야 하므로 () => { return {} } 형태
				return { no: idx + 1, ingredient: data[`strIngredient${idx + 1}`], measure: data[`strMeasure${idx + 1}`] };
			});

			setTableData(ingredients);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<h1>{data.strMeal}</h1>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<TableY data={TableData} title={'Ingredient'} className={clsx(styles.detailTable)} />
				</>
			)}
		</section>
	);
}
